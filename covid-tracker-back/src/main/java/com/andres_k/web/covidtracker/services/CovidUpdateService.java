package com.andres_k.web.covidtracker.services;

import com.andres_k.web.covidtracker.dao.CovidDataRepository;
import com.andres_k.web.covidtracker.dao.DataUpdatedRepository;
import com.andres_k.web.covidtracker.dao.ValidDateRepository;
import com.andres_k.web.covidtracker.dao.ValidLocationRepository;
import com.andres_k.web.covidtracker.models.CovidData;
import com.andres_k.web.covidtracker.models.DataUpdated;
import com.andres_k.web.covidtracker.models.ValidDate;
import com.andres_k.web.covidtracker.models.ValidLocation;
import com.andres_k.web.covidtracker.utils.Console;
import com.andres_k.web.covidtracker.utils.data.APIEndpoint;
import com.andres_k.web.covidtracker.utils.http.HttpClient;
import com.andres_k.web.covidtracker.utils.tools.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CovidUpdateService {
    private final CovidDataRepository covidDataRepository;
    private final ValidDateRepository validDateRepository;
    private final ValidLocationRepository validLocationRepository;
    private final DataUpdatedRepository dataUpdatedRepository;
    private final HttpClient httpClient;

    @Autowired
    public CovidUpdateService(CovidDataRepository covidDataRepository, ValidDateRepository validDateRepository, ValidLocationRepository validLocationRepository, DataUpdatedRepository dataUpdatedRepository, HttpClient httpClient) {
        this.covidDataRepository = covidDataRepository;
        this.validDateRepository = validDateRepository;
        this.validLocationRepository = validLocationRepository;
        this.dataUpdatedRepository = dataUpdatedRepository;
        this.httpClient = httpClient;
    }

    public void update() throws Exception {
        String lastEntry = this.validDateRepository.findTopDateOrderByDesc();
        Map<String, List<CovidData>> data = this.loadFullDataFromAPIs(TString.isNull(lastEntry) ? null : lastEntry);
        this.saveValidLocations(data, false);
        this.saveValidDates(data, false);
        this.saveCovidData(data);
    }

    public void resetData() throws Exception {
        Map<String, List<CovidData>> data = this.loadFullDataFromAPIs(null);

        if (data.isEmpty() || data.get(data.keySet().toArray()[0]).size() == 0) {
            return;
        }
        // Archive
        List<CovidData> archive = this.covidDataRepository.findAll();
        TFiles.writeInFile("covid_data_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy--HH-mm")), TJson.toString(archive));
        this.covidDataRepository.deleteAll();

        this.saveValidLocations(data, true);
        this.saveValidDates(data, true);
        this.saveCovidData(data);
    }

    private void saveCovidData(Map<String, List<CovidData>> data) {
        List<CovidData> newEntries = data.values().stream().flatMap(Collection::stream).collect(Collectors.toList());
        this.covidDataRepository.saveAll(newEntries);
        this.dataUpdatedRepository.save(new DataUpdated(LocalDateTime.now(), newEntries.size()));
    }

    private void saveValidLocations(Map<String, List<CovidData>> data, boolean reset) {
        List<String> locations = new ArrayList<>(data.keySet());
        if (reset) {
            this.validLocationRepository.deleteAllWithQuery();
        }
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

    private void saveValidDates(Map<String, List<CovidData>> data, boolean reset) {
        List<ValidDate> newDates = new ArrayList<>();
        for (CovidData item : data.get(data.keySet().toArray()[0])) {
            newDates.add(new ValidDate(item.getDate()));
        }
        if (reset) {
            this.validDateRepository.deleteAllWithQuery();
        }
        this.validDateRepository.saveAll(newDates);
    }

    private Map<String, List<CovidData>> loadFullDataFromAPIs(String optDate) throws Exception {
        try {
            Map<String, List<CovidData>> result = new HashMap<>();
            Map<String, Map<String, CovidData>> data = new HashMap<>();
            this.loadAPIFullData(APIEndpoint.DATA_github_death.getEndpoint(), data, "death", optDate);
            this.loadAPIFullData(APIEndpoint.DATA_github_confirmed.getEndpoint(), data, "confirmed", optDate);
            this.loadAPIFullData(APIEndpoint.DATA_github_recovered.getEndpoint(), data, "recovered", optDate);

            for (Map.Entry<String, Map<String, CovidData>> entry : data.entrySet()) {
                result.put(entry.getKey(), new ArrayList<>(entry.getValue().values()));
            }
            return result;
        } catch (HttpClientErrorException e) {
            throw e;
        }
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
                Integer value = Integer.parseInt(parsedResult.get(i).get(i2 + 4));
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
