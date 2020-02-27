package com.andres_k.web.covidtracker.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity(name = "CovidNews")
@Table(name = "covid_news")
public class CovidNews {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(name="state")
    private String state;
    @NotNull
    @Column(name="country")
    private String country;
    @NotNull
    @Column(name="source")
    private String source;
    @NotNull
    @Column(name="source_country")
    private String sourceCountry;
    @NotNull
    @Column(name="date")
    private LocalDateTime date;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
