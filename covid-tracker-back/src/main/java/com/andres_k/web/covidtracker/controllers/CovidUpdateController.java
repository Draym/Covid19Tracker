package com.andres_k.web.covidtracker.controllers;

import com.andres_k.web.covidtracker.services.CovidUpdateService;
import com.andres_k.web.covidtracker.utils.tools.Console;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
            this.updateService.resetData();
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception ex) {
            Console.log("[User/admin/delete]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
