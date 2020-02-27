package com.andres_k.web.covidtracker.services;

import com.andres_k.web.covidtracker.dao.CovidDataRepository;
import com.andres_k.web.covidtracker.models.CovidData;
import com.andres_k.web.covidtracker.utils.data.APIEndpoint;
import com.andres_k.web.covidtracker.utils.http.HttpClient;
import com.andres_k.web.covidtracker.utils.tools.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.io.LineNumberReader;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CovidUpdateService {
    private final CovidDataRepository covidDataRepository;
    private final HttpClient httpClient;

    @Autowired
    public CovidUpdateService(CovidDataRepository covidDataRepository, HttpClient httpClient) {
        this.covidDataRepository = covidDataRepository;
        this.httpClient = httpClient;
    }

    public void update() throws Exception {
        CovidData lastEntry = this.covidDataRepository.findTopOrderByDesc();
        Map<String, List<CovidData>> data = this.loadFullDataFromAPIs(lastEntry.getDate());

    }

    public void resetData() throws Exception {
        Map<String, List<CovidData>> data = this.loadFullDataFromAPIs(null);
        List<CovidData> archive = this.covidDataRepository.findAll();
        TFiles.writeInFile("covid_data_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy--HH-mm")), TJson.toString(archive));
        this.covidDataRepository.deleteAll();
        List<CovidData> newEntries = data.values().stream().flatMap(Collection::stream).collect(Collectors.toList());
        this.covidDataRepository.saveAll(newEntries);
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
            Console.log("line: " + i + "_" + parsedResult.get(i).get(0)+ "_" + parsedResult.get(i).get(1)+ "_" + parsedResult.get(i).get(2)+ "_" + parsedResult.get(i).get(3)+ "_" + parsedResult.get(i).get(4));
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
}
