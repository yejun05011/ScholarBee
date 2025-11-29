package com.scholarbee.backend.domain.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ScholarshipParsedDto {

    private String applyPeriod;
    private String amount;
    private String people;

    private String targets;
    private String requiredDocs;

    private List<String> foundationCandidates = new ArrayList<>();
}