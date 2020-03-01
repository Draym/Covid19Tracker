package com.andres_k.web.covidtracker.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "ValidLocation")
@Table(name = "valid_location")
public class ValidLocation {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "parent")
    private String parent;
    @Column(name = "location")
    private String location;
    @NotNull
    @Column(name = "type")
    private String type;

    public ValidLocation() {

    }

    public ValidLocation(String location, String parent, String type) {
        this.location = location;
        this.parent = parent;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getParent() {
        return parent;
    }

    public void setParent(String parent) {
        this.parent = parent;
    }
}
