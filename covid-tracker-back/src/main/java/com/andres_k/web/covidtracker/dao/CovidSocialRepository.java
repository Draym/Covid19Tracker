package com.andres_k.web.covidtracker.dao;

import com.andres_k.web.covidtracker.models.CovidSocial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CovidSocialRepository extends JpaRepository<CovidSocial, Long> {
}
