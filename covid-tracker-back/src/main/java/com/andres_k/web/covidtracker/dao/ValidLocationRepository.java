package com.andres_k.web.covidtracker.dao;

import com.andres_k.web.covidtracker.models.ValidLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ValidLocationRepository extends JpaRepository<ValidLocation, Long> {
    @Modifying
    @Transactional
    @Query("delete from ValidLocation")
    void deleteAllWithQuery();

    List<ValidLocation> findAllByLocation(String location);
    List<ValidLocation> findAllByParent(String location);
}
