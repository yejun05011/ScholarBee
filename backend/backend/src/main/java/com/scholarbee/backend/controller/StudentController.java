package com.scholarbee.backend.controller;

import com.scholarbee.backend.dto.StudentRegisterRequestDto;
import com.scholarbee.backend.dto.StudentResponseDto;
import com.scholarbee.backend.global.response.CustomResponse;
import com.scholarbee.backend.service.StudentCommandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class StudentController {

    private final StudentCommandService studentCommandService;

    @PostMapping("/signup")
    public ResponseEntity<CustomResponse<StudentResponseDto>> registerStudent(
            @RequestBody StudentRegisterRequestDto request) {
        StudentResponseDto response = studentCommandService.registerStudent(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(CustomResponse.created("회원가입이 완료되었습니다.", response));
    }
}
