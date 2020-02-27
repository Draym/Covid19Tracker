package com.andres_k.web.covidtracker.utils.tools;


import com.andres_k.web.covidtracker.utils.data.Pair;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class TDate {
    public static Pair<LocalDateTime, LocalDateTime> getDateRangeLimits(LocalDateTime date, Integer minute) {
        Pair<LocalDateTime, LocalDateTime> result = new Pair<>();

        int diff = date.getMinute() % minute;
        result.v1 = date.minusMinutes(diff);
        result.v2 = date.plusMinutes(minute - diff);
        return result;
    }

    public static boolean isGreater(String date1, String date2) {
        LocalDate d1 = LocalDate.parse(date1, DateTimeFormatter.ofPattern("M/d/yy"));
        LocalDate d2 = LocalDate.parse(date2, DateTimeFormatter.ofPattern("MM/dd/yyyy"));
        return d1.isAfter(d2);
    }
}
