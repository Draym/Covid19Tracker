package com.andres_k.web.covidtracker.dao;

import com.andres_k.web.covidtracker.models.DataUpdated;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface DataUpdatedRepository extends JpaRepository<DataUpdated, Long> {
    @Query(nativeQuery = true, value = "SELECT du.date FROM data_updated du ORDER BY du.date DESC limit 1")
    LocalDateTime findTopUpdateOrderByDesc();
}
