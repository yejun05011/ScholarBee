package com.scholarbee.backend.domain.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ScholarshipParsedDto {

    private String applyStart;
    private String applyEnd;
    private String amount;
    private String people;

    private List<String> targets = new ArrayList<>();
    private List<String> requiredDocs = new ArrayList<>();

    private List<String> otherLines = new ArrayList<>();

    private List<String> foundationCandidates = new ArrayList<>();
}