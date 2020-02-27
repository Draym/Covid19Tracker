package com.andres_k.web.covidtracker.utils.tools;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class TFiles {
    public static List<Path> getAllFiles(String path) throws IOException {
        try (Stream<Path> walk = Files.walk(Paths.get(path))) {
            return walk.filter(Files::isRegularFile).collect(Collectors.toList());
        } catch (IOException e) {
            throw e;
        }
    }

    public static String getFileName(String fileName) {
        return fileName.substring(0, fileName.indexOf("."));
    }

    public static String getFileExtension(String fileName) {
        return fileName.substring(fileName.indexOf(".") + 1);
    }

    public static void writeInFile(String fileName, String value) {
        fileName = "logs/" + fileName;
        File file = new File(fileName);
        file.getParentFile().mkdirs();
        try (FileWriter writer = new FileWriter(file); BufferedWriter bw = new BufferedWriter(writer)) {
            bw.write(value);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
