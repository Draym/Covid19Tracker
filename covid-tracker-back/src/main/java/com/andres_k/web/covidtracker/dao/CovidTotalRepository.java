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
    @Query("delete from CovidTotal")
    void deleteAllWithQuery();

    CovidTotal findDistinctByDateAndStateAndCountry(String date, String state, String country);
}
