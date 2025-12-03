package com.scholarbee.backend.controller;

import com.scholarbee.backend.domain.dto.StudentDetailRequestDto;
import com.scholarbee.backend.domain.dto.StudentDetailResponseDto;
import com.scholarbee.backend.global.response.CustomResponse;
import com.scholarbee.backend.service.StudentDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/students/me")
public class StudentDetailController {

    private final StudentDetailService studentDetailService;

    /**
     * 입력정보 등록
     */
    @PostMapping("/details")
    public ResponseEntity<CustomResponse<Void>> registerStudentDetails(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody StudentDetailRequestDto requestDto) {
        studentDetailService.registerStudentDetails(userDetails.getUsername(), requestDto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(CustomResponse.created("사용자 정보가 등록되었습니다.", null));
    }

    /**
     * 입력정보 조회
     */
    @GetMapping("/details")
    public ResponseEntity<CustomResponse<StudentDetailResponseDto>> getStudentDetails(
            @AuthenticationPrincipal UserDetails userDetails) {
        StudentDetailResponseDto response = studentDetailService.getStudentDetails(userDetails.getUsername());

        return ResponseEntity.ok(
                CustomResponse.ok("사용자 입력정보 조회 성공", response)
        );
    }

}
