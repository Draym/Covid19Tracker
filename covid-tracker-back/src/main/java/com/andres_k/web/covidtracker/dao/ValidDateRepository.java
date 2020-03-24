package com.andres_k.web.covidtracker.dao;

import com.andres_k.web.covidtracker.models.ValidDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface ValidDateRepository extends JpaRepository<ValidDate, Long> {
    @Query(nativeQuery = true, value = "SELECT cd.date FROM valid_date cd ORDER BY STR_TO_DATE(cd.date, '%m/%d/%Y') DESC limit 1")
    String findTopDateOrderByDesc();

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "delete from valid_date WHERE :date is NULL OR STR_TO_DATE(date, '%m/%d/%Y') > STR_TO_DATE(:date, '%m/%d/%Y')")
    void deleteAllWithQuery(String date);

    boolean existsByDate(String date);

    @Query(nativeQuery = true, value = "SELECT cd.date FROM valid_date cd WHERE STR_TO_DATE(cd.date, '%m/%d/%Y') < STR_TO_DATE(:date, '%m/%d/%Y') ORDER BY STR_TO_DATE(cd.date, '%m/%d/%Y') DESC limit 1")
    String findTopDateOrderByDescBefore(String date);
}
