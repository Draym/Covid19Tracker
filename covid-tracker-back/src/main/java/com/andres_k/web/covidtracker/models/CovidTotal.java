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
    @Column(name = "state")
    private String state;
    @Column(name = "country")
    private String country;
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
    @Column(name = "add_recovered")
    private Integer addRecovered;
    @NotNull
    @Column(name = "add_confirmed")
    private Integer addConfirmed;
    @NotNull
    @Column(name = "add_death")
    private Integer addDeath;
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

    public CovidTotal(String state, String country, Integer totalConfirmed, Integer totalRecovered, Integer totalDeath, Integer addConfirmed, Integer addRecovered, Integer addDeath, String date) {
        this.state = state;
        this.country = country;
        this.totalRecovered = totalRecovered;
        this.totalConfirmed = totalConfirmed;
        this.totalDeath = totalDeath;
        this.addRecovered = addRecovered;
        this.addConfirmed = addConfirmed;
        this.addDeath = addDeath;
        this.incRecovered = (totalRecovered == 0 ? 0d : addRecovered * 100d / (totalRecovered - addRecovered));
        this.incConfirmed = (totalConfirmed == 0 ? 0d : addConfirmed * 100d / (totalConfirmed - addConfirmed));
        this.incDeath = (totalDeath == 0 ? 0d : addDeath * 100d / (totalDeath - addDeath));
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

    public Integer getAddRecovered() {
        return addRecovered;
    }

    public void setAddRecovered(Integer addRecovered) {
        this.addRecovered = addRecovered;
    }

    public Integer getAddConfirmed() {
        return addConfirmed;
    }

    public void setAddConfirmed(Integer addConfirmed) {
        this.addConfirmed = addConfirmed;
    }

    public Integer getAddDeath() {
        return addDeath;
    }

    public void setAddDeath(Integer addDeath) {
        this.addDeath = addDeath;
    }
}
