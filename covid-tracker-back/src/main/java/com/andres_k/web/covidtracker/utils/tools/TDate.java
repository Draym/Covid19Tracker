package com.andres_k.web.covidtracker.utils.tools;


import com.andres_k.web.covidtracker.models.CovidTotal;
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

    public static LocalDate convert(String date) {
        return LocalDate.parse(date, DateTimeFormatter.ofPattern("M/d/yy"));
    }

    public static boolean isGreater(String date1, String date2) {
        LocalDate d1 = convert(date1);
        LocalDate d2 = convert(date2);
        return d1.isAfter(d2);
    }

    public static String minusDay(String date, int day) {
        LocalDate previousDate = TDate.convert(date).minusDays(day);
        return previousDate.format(DateTimeFormatter.ofPattern("M/d/yy"));
    }
}
