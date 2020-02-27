package com.andres_k.web.covidtracker.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Entity(name = "CovidData")
@Table(name = "covid_data")
public class CovidData {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(name = "state")
    private String state;
    @NotNull
    @Column(name = "country")
    private String country;
    @NotNull
    @Column(name = "latitude")
    private Double latitude;
    @NotNull
    @Column(name = "longitude")
    private Double longitude;
    @NotNull
    @Column(name = "date")
    private String date;
    @NotNull
    @Column(name = "confirmed")
    private Integer confirmed;
    @NotNull
    @Column(name = "recovered")
    private Integer recovered;
    @NotNull
    @Column(name = "death")
    private Integer death;

    public CovidData() {

    }

    public CovidData(String state, String country, Double latitude, Double longitude, String date) {
        this.state = state;
        this.country = country;
        this.longitude = longitude;
        this.latitude = latitude;
        this.date = date;
    }

    public void setValue(String key, Integer value) {
        switch (key) {
            case "death":
                this.death = value;
                break;
            case "recovered":
                this.recovered = value;
                break;
            case "confirmed":
                this.confirmed = value;
                break;
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getConfirmed() {
        return confirmed;
    }

    public void setConfirmed(Integer confirmed) {
        this.confirmed = confirmed;
    }

    public Integer getRecovered() {
        return recovered;
    }

    public void setRecovered(Integer recovered) {
        this.recovered = recovered;
    }

    public Integer getDeath() {
        return death;
    }

    public void setDeath(Integer death) {
        this.death = death;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
}
