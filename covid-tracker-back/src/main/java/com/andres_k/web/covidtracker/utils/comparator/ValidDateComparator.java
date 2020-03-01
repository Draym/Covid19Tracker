package com.andres_k.web.covidtracker.utils.comparator;

import com.andres_k.web.covidtracker.models.ValidDate;
import com.andres_k.web.covidtracker.utils.tools.TDate;

import java.time.LocalDate;
import java.util.Comparator;

public class ValidDateComparator implements Comparator<ValidDate> {
    @Override
    public int compare(ValidDate o1, ValidDate o2) {
        LocalDate d1 = TDate.convert(o1.getDate());
        LocalDate d2 = TDate.convert(o2.getDate());
        return d1.compareTo(d2);
    }
}
