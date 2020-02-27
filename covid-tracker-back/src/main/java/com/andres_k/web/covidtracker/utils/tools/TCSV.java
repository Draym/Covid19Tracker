package com.andres_k.web.covidtracker.utils.tools;

import com.opencsv.CSVParser;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TCSV {

    public static List<List<String>> read(String text) throws IOException {
        CSVParser parser = new CSVParser();
        List<List<String>> parsed = new ArrayList<>();
        String[] lines = text.split("\\r?\\n");

        for (int i = 0; i < lines.length; ++i) {
            parsed.add(Arrays.asList(parser.parseLine(lines[i])));
        }
        return parsed;
    }
}
