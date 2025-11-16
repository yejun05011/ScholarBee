package com.scholarbee.backend.dto;

import com.scholarbee.backend.entity.Student;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Builder
public class StudentDetailResponseDto {

    private Long studentId;
    private BigDecimal gpa;
    private Integer grade;
    private Integer semester;
    private Integer incomeBracket;
    private String major;
    private Integer volunteerHours;
    private List<String> certificates;
    private Boolean isDisabled;

    public static StudentDetailResponseDto from(Student student) {
        return StudentDetailResponseDto.builder()
                .studentId(student.getId())
                .gpa(student.getGpa())
                .grade(student.getGrade())
                .semester(student.getSemester())
                .incomeBracket(student.getIncomeBracket())
                .major(student.getMajor())
                .volunteerHours(
                        student.getVolunteer() != null ? student.getVolunteer().getHours() : 0
                )
                .certificates(
                        student.getCertificates()
                                .stream()
                                .map(Certificate::getName)
                                .toList()
                )
                .isDisabled(student.getDisabled())
                .build();
    }
}
