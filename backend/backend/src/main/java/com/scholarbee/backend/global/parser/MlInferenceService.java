package com.scholarbee.backend.global.parser;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@Service
@Slf4j
public class MlInferenceService {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public String predict(String text) {
        try {
            // 프로젝트 경로 자동 인식
            String projectRoot = System.getProperty("user.dir");

            // inference.py 경로
            String scriptPath = projectRoot + "/inference/inference.py";

            ProcessBuilder pb = new ProcessBuilder(
                    "python3",
                    scriptPath,
                    text
            );

            pb.redirectErrorStream(true);
            Process process = pb.start();

            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream(), "UTF-8")
            );

            StringBuilder output = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                output.append(line);
            }

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                log.error("Python script exited with code " + exitCode);
            }

            // JSON 파싱
            JsonNode jsonNode = objectMapper.readTree(output.toString());

            if (jsonNode.has("error")) {
                log.error("ML ERROR: " + jsonNode.get("error").asText());
                return "ERROR";
            }

            return jsonNode.get("label").asText();

        } catch (Exception e) {
            log.error("Inference failed: ", e);
            return "ERROR";
        }
    }
}