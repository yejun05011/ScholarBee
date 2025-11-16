package com.scholarbee.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDetailRequestDto {

    private Integer grade;
    private String department;
    private Boolean isDisabled;
    private Integer incomeBracket;

    private List<VolunteerRequestDto> volunteers;
    private List<String> certificates;
    private List<AcademicRecordRequestDto> records;
}
