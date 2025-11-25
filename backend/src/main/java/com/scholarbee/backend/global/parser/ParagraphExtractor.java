package com.scholarbee.backend.global.parser;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ParagraphExtractor {

    public List<String> splitIntoParagraphs(String rawText) {

        String[] lines = rawText.split("\n");

        List<String> paragraphs = new ArrayList<>();

        StringBuilder current = new StringBuilder();

        for (String line : lines) {
            if (line.trim().isEmpty()) {
                if (!current.isEmpty()) {
                    paragraphs.add(current.toString().trim());
                    current.setLength(0);
                }
            } else {
                current.append(line).append(" ");
            }
        }

        if (!current.isEmpty()) {
            paragraphs.add(current.toString().trim());
        }

        return paragraphs;
    }
}
