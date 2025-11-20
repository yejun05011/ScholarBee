package com.scholarbee.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class ScholarshipCreateResponseDto {

    private Long scholarshipId;
    private String name;
}
