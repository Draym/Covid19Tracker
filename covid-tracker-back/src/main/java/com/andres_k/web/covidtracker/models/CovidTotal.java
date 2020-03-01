package com.andres_k.web.covidtracker.models;


import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "CovidTotal")
@Table(name = "covid_total")
public class CovidTotal {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(name = "total_recovered")
    private Integer totalRecovered;
    @NotNull
    @Column(name = "total_confirmed")
    private Integer totalConfirmed;
    @NotNull
    @Column(name = "total_death")
    private Integer totalDeath;
    @NotNull
    @Column(name = "inc_recovered")
    private Double incRecovered;
    @NotNull
    @Column(name = "inc_confirmed")
    private Double incConfirmed;
    @NotNull
    @Column(name = "inc_death")
    private Double incDeath;
    @NotNull
    @Column(name = "date")
    private String date;

    public CovidTotal() {

    }

    public CovidTotal(Integer totalRecovered, Integer totalConfirmed, Integer totalDeath, Double incRecovered, Double incConfirmed, Double incDeath, String date) {
        this.totalRecovered = totalRecovered;
        this.totalConfirmed = totalConfirmed;
        this.totalDeath = totalDeath;
        this.incRecovered = incRecovered;
        this.incConfirmed = incConfirmed;
        this.incDeath = incDeath;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTotalRecovered() {
        return totalRecovered;
    }

    public void setTotalRecovered(Integer total_recover) {
        this.totalRecovered = total_recover;
    }

    public Integer getTotalConfirmed() {
        return totalConfirmed;
    }

    public void setTotalConfirmed(Integer total_confirmed) {
        this.totalConfirmed = total_confirmed;
    }

    public Integer getTotalDeath() {
        return totalDeath;
    }

    public void setTotalDeath(Integer total_death) {
        this.totalDeath = total_death;
    }

    public Double getIncRecovered() {
        return incRecovered;
    }

    public void setIncRecovered(Double inc_recover) {
        this.incRecovered = inc_recover;
    }

    public Double getIncConfirmed() {
        return incConfirmed;
    }

    public void setIncConfirmed(Double inc_confirmed) {
        this.incConfirmed = inc_confirmed;
    }

    public Double getIncDeath() {
        return incDeath;
    }

    public void setIncDeath(Double inc_death) {
        this.incDeath = inc_death;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
