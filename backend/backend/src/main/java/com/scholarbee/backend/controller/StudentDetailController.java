package com.scholarbee.backend.controller;

import com.scholarbee.backend.dto.StudentDetailsRequestDto;
import com.scholarbee.backend.global.response.CustomResponse;
import com.scholarbee.backend.service.StudentDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/students/me")
public class StudentDetailController {

    private final StudentDetailService studentDetailService;

    @PostMapping("/details")
    public ResponseEntity<CustomResponse<Void>> registerStudentDetails(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody StudentDetailsRequestDto requestDto) {
        studentDetailService.registerStudentDetails(userDetails.getUsername(), requestDto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(CustomResponse.created("사용자 정보가 등록되었습니다.", null));
    }
}
