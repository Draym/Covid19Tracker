package com.andres_k.web.covidtracker.dao;

import com.andres_k.web.covidtracker.models.CovidTotal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CovidTotalRepository extends JpaRepository<CovidTotal, Long> {
    CovidTotal findDistinctByDateAndStateAndCountry(String date, String state, String country);
}
