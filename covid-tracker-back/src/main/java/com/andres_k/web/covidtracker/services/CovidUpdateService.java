package com.andres_k.web.covidtracker.services;

import com.andres_k.web.covidtracker.dao.*;
import com.andres_k.web.covidtracker.models.CovidData;
import com.andres_k.web.covidtracker.models.DataUpdated;
import com.andres_k.web.covidtracker.models.ValidDate;
import com.andres_k.web.covidtracker.models.ValidLocation;
import com.andres_k.web.covidtracker.utils.data.APIEndpoint;
import com.andres_k.web.covidtracker.utils.http.HttpClient;
import com.andres_k.web.covidtracker.utils.tools.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CovidUpdateService {
    private final CovidTotalRepository covidTotalRepository;
    private final CovidDataRepository covidDataRepository;
    private final ValidDateRepository validDateRepository;
    private final ValidLocationRepository validLocationRepository;
    private final DataUpdatedRepository dataUpdatedRepository;
    private final HttpClient httpClient;

    @Autowired
    public CovidUpdateService(CovidTotalRepository covidTotalRepository, CovidDataRepository covidDataRepository, ValidDateRepository validDateRepository, ValidLocationRepository validLocationRepository, DataUpdatedRepository dataUpdatedRepository, HttpClient httpClient) {
        this.covidTotalRepository = covidTotalRepository;
        this.covidDataRepository = covidDataRepository;
        this.validDateRepository = validDateRepository;
        this.validLocationRepository = validLocationRepository;
        this.dataUpdatedRepository = dataUpdatedRepository;
        this.httpClient = httpClient;
    }

    public void update() throws Exception {
        String lastEntry = this.validDateRepository.findTopDateOrderByDesc();
        Map<String, List<CovidData>> data = this.loadFullDataFromAPIs(TString.isNull(lastEntry) ? null : lastEntry);
        this.saveValidLocations(data);
        this.saveValidDates(data, null, false);
        this.saveCovidData(data);
    }

    public void resetData(String date) throws Exception {
        Map<String, List<CovidData>> data = this.loadFullDataFromAPIs(date);

        if (data.isEmpty() || data.get(data.keySet().toArray()[0]).size() == 0) {
            return;
        }
        // Archive
        List<CovidData> archive = this.covidDataRepository.findAll();
        TFiles.writeInFile("covid_data_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy--HH-mm")), TJson.toString(archive));
        this.covidDataRepository.deleteAllWithQuery(date);
        this.clearSavedTotal(date);
        this.saveValidLocations(data);
        this.saveValidDates(data, date, true);
        this.saveCovidData(data);
    }

    private void saveCovidData(Map<String, List<CovidData>> data) {
        List<CovidData> newEntries = data.values().stream().flatMap(Collection::stream).collect(Collectors.toList());
        this.covidDataRepository.saveAll(newEntries);
        this.dataUpdatedRepository.save(new DataUpdated(LocalDateTime.now(), newEntries.size()));
    }

    public void clearSavedTotal(String date) {
        this.covidTotalRepository.deleteAllWithQuery(date);
    }

    private void saveValidLocations(Map<String, List<CovidData>> data) {
        List<ValidLocation> validLocations = this.validLocationRepository.findAll();
        Map<String, Integer> dataLocations = data.keySet().stream()
                .collect(Collectors.toMap(e -> e, e -> 1));
        for (ValidLocation valid : validLocations) {
            dataLocations.remove((valid.getLocation() == null ? "" : valid.getLocation()) + "_" + valid.getParent());
        }
        if (dataLocations.size() == 0)
            return;

        List<String> locations = new ArrayList<>(dataLocations.keySet());
        Map<String, ValidLocation> newLocations = new HashMap<>();
        for (String location : locations) {
            String[] values = location.split("_");

            if (values.length > 1) {
                newLocations.put(location, new ValidLocation(TString.isNull(values[0]) ? null : values[0], values[1], "state"));
                newLocations.put(values[1], new ValidLocation(values[1], null, "country"));
            }
        }

        this.validLocationRepository.saveAll(new ArrayList<>(newLocations.values()));
    }

    private void saveValidDates(Map<String, List<CovidData>> data, String date, boolean reset) {
        List<ValidDate> newDates = new ArrayList<>();
        for (CovidData item : data.get(data.keySet().toArray()[0])) {
            newDates.add(new ValidDate(item.getDate()));
        }
        if (reset) {
            this.validDateRepository.deleteAllWithQuery(date);
        }
        this.validDateRepository.saveAll(newDates);
    }

    private Map<String, List<CovidData>> loadFullDataFromAPIs(String optDate) throws Exception {
        Map<String, List<CovidData>> result = new HashMap<>();
        Map<String, Map<String, CovidData>> data = new HashMap<>();
        this.loadAPIFullData(APIEndpoint.DATA_github_death.getEndpoint(), data, "death", optDate);
        this.loadAPIFullData(APIEndpoint.DATA_github_confirmed.getEndpoint(), data, "confirmed", optDate);
        this.loadAPIFullData(APIEndpoint.DATA_github_recovered.getEndpoint(), data, "recovered", optDate);

        for (Map.Entry<String, Map<String, CovidData>> entry : data.entrySet()) {
            result.put(entry.getKey(), new ArrayList<>(entry.getValue().values()));
        }
        return result;
    }

    private void loadAPIFullData(String endpoint, Map<String, Map<String, CovidData>> data, String entryID, String optDate) throws Exception {
        String result = this.httpClient.GET(new ParameterizedTypeReference<String>() {
        }, endpoint, null, null);

        List<List<String>> parsedResult = TCSV.read(result);
        if (parsedResult.size() < 2) {
            throw new Exception("Error: API Data is empty");
        }
        List<String> dates = parsedResult.get(0).subList(4, parsedResult.get(0).size());

        for (int i = 1; i < parsedResult.size(); ++i) {
            String state = parsedResult.get(i).get(0);
            String country = parsedResult.get(i).get(1);
            Double latitude = Double.parseDouble(parsedResult.get(i).get(2));
            Double longitude = Double.parseDouble(parsedResult.get(i).get(3));

            String key = state + "_" + country;

            if (!data.containsKey(key)) {
                data.put(key, new HashMap<>());
            }
            for (int i2 = 0; i2 < dates.size(); ++i2) {
                String date = dates.get(i2);
                if (optDate != null && !TDate.isGreater(date, optDate)) {
                    continue;
                }
                String tmp = parsedResult.get(i).get(i2 + 4);
                Integer value = TString.isNull(tmp) ? 0 : Integer.parseInt(tmp);
                CovidData item;
                if (!data.get(key).containsKey(date)) {
                    item = new CovidData(state, country, latitude, longitude, date);
                } else {
                    item = data.get(key).get(date);
                }
                item.setValue(entryID, value);
                data.get(key).put(date, item);
            }
        }
    }

    public LocalDateTime getLastDataUpdate() {
        return this.dataUpdatedRepository.findTopUpdateOrderByDesc();
    }
}
