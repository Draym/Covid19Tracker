package com.andres_k.web.covidtracker.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "ValidDate")
@Table(name = "valid_date")
public class ValidDate {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(name = "date")
    private String date;

    public ValidDate() {

    }

    public ValidDate(String date) {
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
