package com.andres_k.web.covidtracker.dao;

import com.andres_k.web.covidtracker.models.CovidData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface CovidDataRepository extends JpaRepository<CovidData, Long> {
    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "delete from covid_data WHERE :date is NULL OR STR_TO_DATE(date, '%m/%d/%Y') > STR_TO_DATE(:date, '%m/%d/%Y')")
    void deleteAllWithQuery(String date);

    CovidData findDistinctByDateAndStateAndCountry(String date, String state, String country);

    @Query("SELECT c FROM CovidData c WHERE (:date is null or c.date = :date) and (:state is null or c.state = :state) and (:country is null or c.country = :country)")
    List<CovidData> findAllByDateAndStateAndCountry(String date, String state, String country);

    List<CovidData> findAllByDate(String date);
    List<CovidData> findAllByState(String state);
    List<CovidData> findAllByCountry(String country);
    List<CovidData> findAllByStateAndCountry(String state, String country);
}
