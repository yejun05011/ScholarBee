package com.scholarbee.backend.service;

import com.scholarbee.backend.domain.dto.StudentLoginRequestDto;
import com.scholarbee.backend.domain.dto.StudentLoginResponseDto;
import com.scholarbee.backend.domain.dto.StudentMyPageResponseDto;
import com.scholarbee.backend.domain.entity.Student;
import com.scholarbee.backend.global.exception.CustomException;
import com.scholarbee.backend.global.jwt.JwtTokenProvider;
import com.scholarbee.backend.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentQueryService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public StudentLoginResponseDto login(StudentLoginRequestDto request) {
        Student student = studentRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "존재하지 않는 이메일입니다."));

        if (!passwordEncoder.matches(request.getPassword(), student.getPassword())) {
            throw new CustomException(HttpStatus.UNAUTHORIZED, "비밀번호가 일치하지 않습니다.");
        }

        String accessToken = jwtTokenProvider.generateToken(student.getEmail());
        long expiresIn = jwtTokenProvider.getAccessTokenValiditySeconds();

        return StudentLoginResponseDto.builder()
                .accessToken(accessToken)
                .expiresIn(expiresIn)
                .build();
    }

    public StudentMyPageResponseDto getMyPage(String email) {
        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "학생을 찾을 수 없습니다."));

        return StudentMyPageResponseDto.builder()
                .studentId(student.getId())
                .name(student.getName())
                .email(student.getEmail())
                .department(student.getDepartment())
                .build();
    }
}
