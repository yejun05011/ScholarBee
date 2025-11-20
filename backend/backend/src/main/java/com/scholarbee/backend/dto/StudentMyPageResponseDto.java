package com.scholarbee.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class StudentMyPageResponseDto {
    private Long studentId;
    private String name;
    private String email;
    private String department;
}
