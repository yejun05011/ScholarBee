package com.scholarbee.backend.global.parser;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.*;

@Service
public class MlInferenceService {

    public String predictLabel(String paragraph) {
        try {
            ProcessBuilder pb = new ProcessBuilder(
                    "python3",
                    "ml/inference.py",
                    "--text",
                    paragraph
            );

            pb.redirectErrorStream(true);
            Process process = pb.start();

            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream())
            );

            StringBuilder sb = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }

            process.waitFor();

            JSONObject json = new JSONObject(sb.toString());

            return json.getString("label");

        } catch (Exception e) {
            e.printStackTrace();
            return "OTHER";
        }
    }
}

