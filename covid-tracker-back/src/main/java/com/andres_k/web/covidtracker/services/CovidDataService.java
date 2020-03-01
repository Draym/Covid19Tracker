package com.andres_k.web.covidtracker.services;

import com.andres_k.web.covidtracker.dao.CovidDataRepository;
import com.andres_k.web.covidtracker.dao.CovidTotalRepository;
import com.andres_k.web.covidtracker.models.CovidData;
import com.andres_k.web.covidtracker.models.CovidTotal;
import com.andres_k.web.covidtracker.models.ValidDate;
import com.andres_k.web.covidtracker.utils.comparator.ValidDateComparator;
import com.andres_k.web.covidtracker.utils.tools.TDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CovidDataService {
    private final CovidDataRepository covidDataRepository;
    private final CovidTotalRepository covidTotalRepository;
    private final ValidDateService validDateService;

    @Autowired
    public CovidDataService(CovidDataRepository covidDataRepository, CovidTotalRepository covidTotalRepository, ValidDateService validDateService) {
        this.covidDataRepository = covidDataRepository;
        this.covidTotalRepository = covidTotalRepository;
        this.validDateService = validDateService;
    }

    public CovidTotal getTotalAt(String date, String state, String country, boolean calculateInc) {
        if (!this.validDateService.dateIsValid(date)) {
            date = this.validDateService.findLastValidDate(date);
            if (date == null)
                return null;
        }
        CovidTotal total = this.covidTotalRepository.findDistinctByDateAndStateAndCountry(date, state, country);

        if (total == null) {
            List<CovidData> data = this.covidDataRepository.findAllByDateAndStateAndCountry(date, state, country);

            if (data.isEmpty()) {
                return null;
            }
            Integer totalConfirmed = 0;
            Integer totalDeath = 0;
            Integer totalRecovered = 0;
            Integer addConfirmed = 0;
            Integer addDeath = 0;
            Integer addRecovered = 0;

            for (CovidData item : data) {
                totalConfirmed += item.getConfirmed();
                totalRecovered += item.getRecovered();
                totalDeath += item.getDeath();
            }
            if (calculateInc) {
                CovidTotal previous = this.getTotalAt(TDate.minusDay(date, 1), state, country, false);
                if (previous != null) {
                    addConfirmed = totalConfirmed - previous.getTotalConfirmed();
                    addRecovered = totalRecovered - previous.getTotalRecovered();
                    addDeath = totalDeath - previous.getTotalDeath();
                }
            }

            total = new CovidTotal(state, country, totalConfirmed, totalRecovered, totalDeath, addConfirmed, addRecovered, addDeath, date);

            if (calculateInc) {
                this.covidTotalRepository.save(total);
            }
        }
        return total;
    }

    public List<CovidTotal> getTotal(String state, String country) {
        List<ValidDate> dates = this.validDateService.findAll();
        List<CovidTotal> total = new ArrayList<>();

        dates.sort(new ValidDateComparator());
        for (ValidDate date : dates) {
            total.add(this.getTotalAt(date.getDate(), state, country, true));
        }
        return total;
    }

    public List<CovidData> getStateTotal(String date, String state, String country) {
        if (!this.validDateService.dateIsValid(date)) {
            date = this.validDateService.findLastValidDate(date);
            if (date == null)
                return null;
        }
        return this.covidDataRepository.findAllByDateAndStateAndCountry(date, state, country);
    }
}
