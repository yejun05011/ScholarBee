package com.scholarbee.backend.domain.dto;

import com.scholarbee.backend.domain.entity.AcademicRecord;
import com.scholarbee.backend.domain.entity.Student;
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
        Integer latestSemester = student.getAcademicRecords().stream()
                .map(AcademicRecord::getSemester)
                .max(Integer::compareTo)
                .orElse(null);

        List<AcademicRecordDto> records = student.getAcademicRecords().stream()
                .map(AcademicRecordDto::from)
                .toList();

        List<CertificateDto> certificateDtos = student.getCertificates().stream()
                .map(CertificateDto::from)
                .toList();

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
