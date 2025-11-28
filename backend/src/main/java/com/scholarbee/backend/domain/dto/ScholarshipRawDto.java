package com.scholarbee.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ScholarshipRawDto {
    private String name;
    private String url;
    private String foundation;
    private String postedDate;
    private String rawText;  // ML용 본문 전체 텍스트
}
