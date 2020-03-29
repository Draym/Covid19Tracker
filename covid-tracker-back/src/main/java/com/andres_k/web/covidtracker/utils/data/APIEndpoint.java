package com.andres_k.web.covidtracker.utils.data;

public enum APIEndpoint {
    DATA_github_death("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"),
    DATA_github_recovered("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv"),
    DATA_github_confirmed("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv");

    private String endpoint;

    APIEndpoint(String endpoint){
        this.endpoint = endpoint;
    }
    public String getEndpoint() {
        return this.endpoint;
    }
}
