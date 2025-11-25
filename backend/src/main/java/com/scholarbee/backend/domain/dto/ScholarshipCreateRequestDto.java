package com.scholarbee.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScholarshipCreateRequestDto {
    private String name;
    private String amount;
    private String foundation;
    private String applyStart;
    private String applyEnd;
    private String target;
}
