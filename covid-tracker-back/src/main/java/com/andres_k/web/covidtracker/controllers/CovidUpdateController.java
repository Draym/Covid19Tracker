package com.andres_k.web.covidtracker.controllers;

import com.andres_k.web.covidtracker.models.DataUpdated;
import com.andres_k.web.covidtracker.services.CovidUpdateService;
import com.andres_k.web.covidtracker.utils.Console;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;

@Controller
public class CovidUpdateController {
    private final CovidUpdateService updateService;

    @Autowired
    public CovidUpdateController(CovidUpdateService updateService) {
        this.updateService = updateService;
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<?> update() {
        try {
            this.updateService.update();
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception ex) {
            Console.log("[Update/update]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/reset", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<?> reset() {
        try {
            this.updateService.resetData();
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception ex) {
            Console.log("[Update/reset]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/getLastUpdate", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getLastUpdate() {
        try {
            LocalDateTime data = this.updateService.getLastDataUpdate();
            return new ResponseEntity<>(data, HttpStatus.OK);
        } catch (Exception ex) {
            Console.log("[Update/getLastUpdate]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
