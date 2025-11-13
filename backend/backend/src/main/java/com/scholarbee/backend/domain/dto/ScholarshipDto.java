package com.scholarbee.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ScholarshipDto {
    private String title;
    private String provider;
    private String date;
    private String link;
}
