package com.scholarbee.backend.dto;

import com.scholarbee.backend.entity.AcademicRecord;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AcademicRecordDto {

    private Integer semester;
    private Integer credits;
    private Double score;

    public static AcademicRecordDto from(AcademicRecord record) {
        return AcademicRecordDto.builder()
                .semester(record.getSemester())
                .credits(record.getCredits())
                .score(record.getScore().doubleValue())
                .build();
    }
}
