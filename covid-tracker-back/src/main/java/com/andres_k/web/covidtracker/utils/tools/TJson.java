package com.andres_k.web.covidtracker.utils.tools;

import com.andres_k.web.covidtracker.utils.Console;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

public class TJson {

    public static String toString(Object object, boolean defaultTyping){
        ObjectMapper mapper = new ObjectMapper();
        if(defaultTyping)
            mapper.enableDefaultTyping();

        try {
            return mapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            Console.log_err("TJson: " + e.getMessage());
        }
        return null;
    }

    public static String toString(Object object){
       return toString(object, false);
    }

    public static <T> T toObject(String json, Class<T> classValue) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.enableDefaultTyping();

        return mapper.readValue(json, classValue);
    }
}
