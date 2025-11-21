package com.scholarbee.backend.service;

import com.scholarbee.backend.domain.dto.StudentRegisterRequestDto;
import com.scholarbee.backend.domain.dto.StudentResponseDto;
import com.scholarbee.backend.domain.entity.Student;
import com.scholarbee.backend.global.exception.CustomException;
import com.scholarbee.backend.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentCommandService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    public StudentResponseDto registerStudent(StudentRegisterRequestDto request) {
        if (studentRepository.existsByEmail(request.getEmail())) {
            throw new CustomException(HttpStatus.CONFLICT, "이미 존재하는 이메일입니다.");
        }

        Student student = Student.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        studentRepository.save(student);

        return StudentResponseDto.builder()
                .studentId(student.getId())
                .email(student.getEmail())
                .build();
    }
}
