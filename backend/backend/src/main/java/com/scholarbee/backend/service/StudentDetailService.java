package com.scholarbee.backend.service;

import com.scholarbee.backend.dto.StudentDetailResponseDto;
import com.scholarbee.backend.dto.StudentDetailRequestDto;
import com.scholarbee.backend.entity.AcademicRecord;
import com.scholarbee.backend.entity.Certificate;
import com.scholarbee.backend.entity.Student;
import com.scholarbee.backend.entity.Volunteer;
import com.scholarbee.backend.global.exception.CustomException;
import com.scholarbee.backend.repository.AcademicRecordRepository;
import com.scholarbee.backend.repository.CertificateRepository;
import com.scholarbee.backend.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class StudentDetailService {

    private final StudentRepository studentRepository;
    private final AcademicRecordRepository academicRecordRepository;
    private final CertificateRepository certificateRepository;

    @Transactional
    public void registerStudentDetails(String email, StudentDetailRequestDto requestDto) {
        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "해당 이메일의 학생을 찾을 수 없습니다."));

        student.updateDetails(
                requestDto.getDepartment(),
                requestDto.getIsDisabled(),
                requestDto.getIncomeBracket(),
                requestDto.getGrade()
        );

        if (requestDto.getRecords() != null) {
            requestDto.getRecords().forEach(r -> {
                AcademicRecord record = AcademicRecord.builder()
                        .student(student)
                        .semester(r.getSemester())
                        .credits(r.getCredits())
                        .score(BigDecimal.valueOf(r.getScore()))
                        .build();

                student.getAcademicRecords().add(record);
            });
        }

        if (requestDto.getCertificates() != null) {
            requestDto.getCertificates().forEach(c -> {
                Certificate cert = Certificate.builder()
                        .student(student)
                        .certificationName(c.getName())
                        .issuingAuthority(c.getIssuingAuthority())
                        .issueDate(c.getIssueDate())
                        .expiryDate(c.getExpiryDate())
                        .score(c.getScore())
                        .build();

                student.getCertificates().add(cert);
            });
        }

        if (requestDto.getVolunteers() != null) {
            requestDto.getVolunteers().forEach(v -> {
                Volunteer volunteer = Volunteer.builder()
                        .student(student)
                        .organization(v.getOrganization())
                        .activity(v.getActivity())
                        .startDate(v.getStartDate())
                        .endDate(v.getEndDate())
                        .hours(v.getHours())
                        .description(v.getDescription())
                        .build();

                student.getVolunteers().add(volunteer);
            });
        }

        if (!student.getAcademicRecords().isEmpty()) {
            Double gpa = student.getAcademicRecords().stream()
                    .map(record -> record.getScore().doubleValue())
                    .mapToDouble(Double::doubleValue)
                    .average()
                    .orElse(0.0);

            student.updateGpa(gpa);
        }
        studentRepository.save(student);
    }


    public StudentDetailResponseDto getStudentDetails(String email) {
        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "해당 학생을 찾을 수 없습니다."));

        return StudentDetailResponseDto.from(student);
    }
}
