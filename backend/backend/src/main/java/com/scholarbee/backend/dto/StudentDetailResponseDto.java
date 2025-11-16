package com.scholarbee.backend.dto;

import com.scholarbee.backend.entity.*;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class StudentDetailResponseDto {

    private Long studentId;
    private Double gpa;
    private Integer grade;
    private Integer latestSemester;
    private Integer incomeBracket;
    private String department;
    private Boolean isDisabled;

    private List<AcademicRecordDto> records;
    private List<CertificateDto> certificates;
    private List<VolunteerDto> volunteers;

    public static StudentDetailResponseDto from(Student student) {

        // 최신 학기 (null-safe)
        Integer latestSemester = student.getAcademicRecords().stream()
                .map(AcademicRecord::getSemester)
                .max(Integer::compareTo)
                .orElse(null);

        // 학기 리스트 변환
        List<AcademicRecordDto> records = student.getAcademicRecords().stream()
                .map(AcademicRecordDto::from)
                .toList();

        // 자격증 리스트 변환
        List<CertificateDto> certificateDtos = student.getCertificates().stream()
                .map(CertificateDto::from)
                .toList();

        // 봉사 리스트 변환
        List<VolunteerDto> volunteerDtos = student.getVolunteers().stream()
                .map(VolunteerDto::from)
                .toList();

        return StudentDetailResponseDto.builder()
                .studentId(student.getId())
                .gpa(student.getGpa())
                .grade(student.getGrade())
                .latestSemester(latestSemester)
                .incomeBracket(student.getIncomeBracket())
                .department(student.getDepartment())
                .isDisabled(student.getDisabled())
                .records(records)
                .certificates(certificateDtos)
                .volunteers(volunteerDtos)
                .build();
    }
}
