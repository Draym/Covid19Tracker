package com.andres_k.web.covidtracker.services;

import com.andres_k.web.covidtracker.dao.CovidDataRepository;
import com.andres_k.web.covidtracker.dao.CovidTotalRepository;
import com.andres_k.web.covidtracker.dao.DataUpdatedRepository;
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

    public CovidTotal getTotalAt(String date, boolean calculateInc) {
        if (!this.validDateService.dateIsValid(date)) {
            date = this.validDateService.findLastValidDate(date);
            if (date == null)
                return null;
        }
        CovidTotal total = this.covidTotalRepository.findDistinctByDate(date);

        if (total == null) {
            List<CovidData> data = this.covidDataRepository.findAllByDate(date);

            if (data.isEmpty()) {
                return null;
            }
            Integer totalConfirmed = 0;
            Integer totalDeath = 0;
            Integer totalRecovered = 0;
            double incConfirmed = 0d;
            double incDeath = 0d;
            double incRecovered = 0d;

            for (CovidData item : data) {
                totalConfirmed += item.getConfirmed();
                totalDeath += item.getDeath();
                totalRecovered += item.getRecovered();
            }
            if (calculateInc) {
                CovidTotal previous = this.getTotalAt(TDate.minusDay(date, 1), false);
                if (previous != null) {
                    incConfirmed = (totalConfirmed - previous.getTotalConfirmed()) * 100d / totalConfirmed;
                    incDeath = (totalDeath - previous.getTotalDeath()) * 100d / totalDeath;
                    incRecovered = (totalRecovered - previous.getTotalRecovered()) * 100d / totalRecovered;
                }
            }

            total = new CovidTotal(totalRecovered, totalConfirmed, totalDeath, incRecovered, incConfirmed, incDeath, date);

            if (calculateInc) {
                this.covidTotalRepository.save(total);
            }
        }
        return total;
    }

    public List<CovidTotal> getTotal() {
        List<ValidDate> dates = this.validDateService.findAll();
        List<CovidTotal> total = new ArrayList<>();

        dates.sort(new ValidDateComparator());
        for (ValidDate date : dates) {
            total.add(this.getTotalAt(date.getDate(), true));
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
