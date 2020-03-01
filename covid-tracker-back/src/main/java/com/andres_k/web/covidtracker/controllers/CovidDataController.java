package com.andres_k.web.covidtracker.controllers;

import com.andres_k.web.covidtracker.models.CovidData;
import com.andres_k.web.covidtracker.models.CovidTotal;
import com.andres_k.web.covidtracker.models.ValidDate;
import com.andres_k.web.covidtracker.services.CovidDataService;
import com.andres_k.web.covidtracker.services.ValidDateService;
import com.andres_k.web.covidtracker.utils.Console;
import com.andres_k.web.covidtracker.utils.tools.TString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(value = "/data")
public class CovidDataController {
    private final CovidDataService covidDataService;
    private final ValidDateService validDateService;

    @Autowired
    public CovidDataController(CovidDataService covidDataService, ValidDateService validDateService) {
        this.covidDataService = covidDataService;
        this.validDateService = validDateService;
    }

    @RequestMapping(value = "/getTotal", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getTotal(@RequestParam(required = false) String date) {
        try {
            if (TString.isNull(date)) {
                List<CovidTotal> total = this.covidDataService.getTotal();
                return new ResponseEntity<>(total, HttpStatus.OK);
            } else {
                CovidTotal total = this.covidDataService.getTotalAt(date, true);
                return new ResponseEntity<>(total, HttpStatus.OK);
            }
        } catch (Exception ex) {
            Console.log("[Data/getTotal]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/getStateTotal", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getStateTotal(@RequestParam(required = false) String date, @RequestParam(required = false) String state, @RequestParam(required = false) String country) {
        try {
            List<CovidData> data = this.covidDataService.getStateTotal(date, state, country);
            return new ResponseEntity<>(data, HttpStatus.OK);
        } catch (Exception ex) {
            Console.log("[Data/getStateTotal]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/getValidDates", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getValidDates() {
        try {
            List<ValidDate> data = this.validDateService.findAll();
            return new ResponseEntity<>(data, HttpStatus.OK);
        } catch (Exception ex) {
            Console.log("[Data/getValidDates]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
