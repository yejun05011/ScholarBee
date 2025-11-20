package com.scholarbee.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class ScholarshipCreateRequestDto {

    private String name;
    private String amount;
    private String foundation;
    private LocalDate apply_start;
    private LocalDate apply_end;
}
