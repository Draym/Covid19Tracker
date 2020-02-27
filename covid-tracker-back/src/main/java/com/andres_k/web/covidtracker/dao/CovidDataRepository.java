package com.andres_k.web.covidtracker.dao;

import com.andres_k.web.covidtracker.models.CovidData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CovidDataRepository extends JpaRepository<CovidData, Long> {
    @Query(nativeQuery = true, value = "SELECT Top 1 * FROM covid_data cd ORDER BY cd.date DESC")
    CovidData findTopOrderByDesc();
}
