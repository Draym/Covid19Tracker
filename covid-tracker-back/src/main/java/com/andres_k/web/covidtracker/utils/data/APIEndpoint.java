package com.andres_k.web.covidtracker.utils.data;

public enum APIEndpoint {
    DATA_github_death("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv"),
    DATA_github_recovered("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv"),
    DATA_github_confirmed("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv");

    private String endpoint;

    APIEndpoint(String endpoint){
        this.endpoint = endpoint;
    }
    public String getEndpoint() {
        return this.endpoint;
    }
}
