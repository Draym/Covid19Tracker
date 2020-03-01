package com.andres_k.web.covidtracker.services;

import com.andres_k.web.covidtracker.dao.ValidDateRepository;
import com.andres_k.web.covidtracker.models.ValidDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ValidDateService {
    private final ValidDateRepository validDateRepository;

    @Autowired
    public ValidDateService(ValidDateRepository validDateRepository) {
        this.validDateRepository = validDateRepository;
    }

    public List<ValidDate> findAll() {
        return this.validDateRepository.findAll();
    }

    public boolean dateIsValid(String date) {
        return this.validDateRepository.existsByDate(date);
    }

    public String findLastValidDate(String date) {
        return this.validDateRepository.findTopDateOrderByDescBefore(date);
    }
}
