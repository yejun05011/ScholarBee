package com.scholarbee.backend.service;

import com.scholarbee.backend.dto.StudentDetailResponseDto;
import com.scholarbee.backend.dto.StudentDetailRequestDto;
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
                requestDto.getIsDisabled()
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
            requestDto.getCertificates().forEach(name -> {
                Certificate cert = new Certificate(student, name);
                student.getCertificates().add(cert);
            });
        }
        studentRepository.save(student);
    }


    public StudentDetailResponseDto getStudentDetails(String email) {
        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "해당 학생을 찾을 수 없습니다."));

        return StudentDetailResponseDto.from(student);
    }
}
