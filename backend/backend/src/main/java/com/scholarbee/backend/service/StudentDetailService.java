package com.scholarbee.backend.service;

import com.scholarbee.backend.dto.StudentDetailsRequestDto;
import com.scholarbee.backend.entity.AcademicRecord;
import com.scholarbee.backend.entity.Certificate;
import com.scholarbee.backend.entity.Student;
import com.scholarbee.backend.global.exception.CustomException;
import com.scholarbee.backend.repository.AcademicRecordRepository;
import com.scholarbee.backend.repository.CertificateRepository;
import com.scholarbee.backend.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentDetailService {

    private final StudentRepository studentRepository;
    private final AcademicRecordRepository academicRecordRepository;
    private final CertificateRepository certificateRepository;

    @Transactional
    public void registerStudentDetails(String email, StudentDetailsRequestDto requestDto) {
        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "해당 이메일의 학생을 찾을 수 없습니다."));

        student.updateDetails(
                requestDto.getDepartment(),
                requestDto.getIsDisabled()
        );

        if (requestDto.getRecords() != null && !requestDto.getRecords().isEmpty()) {
            List<AcademicRecord> records = requestDto.getRecords().stream()
                    .map(r -> AcademicRecord.builder()
                            .student(student)
                            .semester(r.getSemester())
                            .credits(r.getCredits())
                            .score(BigDecimal.valueOf(r.getScore()))
                            .build())
                    .toList();
            academicRecordRepository.saveAll(records);
        }

        if (requestDto.getCertificates() != null && !requestDto.getCertificates().isEmpty()) {
            List<Certificate> certificates = requestDto.getCertificates().stream()
                    .map(name -> new Certificate(student, name))
                    .toList();

            certificateRepository.saveAll(certificates);
        }
    }
}
