package com.andres_k.web.covidtracker.dao;

import com.andres_k.web.covidtracker.models.CovidTotal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface CovidTotalRepository extends JpaRepository<CovidTotal, Long> {
    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "delete from covid_total WHERE :date is NULL OR STR_TO_DATE(date, '%m/%d/%Y') > STR_TO_DATE(:date, '%m/%d/%Y')")
    void deleteAllWithQuery(String date);

    CovidTotal findDistinctByDateAndStateAndCountry(String date, String state, String country);
}
