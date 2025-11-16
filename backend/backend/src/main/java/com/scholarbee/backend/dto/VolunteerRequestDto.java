package com.scholarbee.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VolunteerRequestDto {

    private String organization;
    private String activity;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer hours;
    private String description;
}
