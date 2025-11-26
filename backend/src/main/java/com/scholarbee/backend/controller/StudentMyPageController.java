package com.scholarbee.backend.controller;

import com.scholarbee.backend.domain.dto.StudentMyPageResponseDto;
import com.scholarbee.backend.global.response.CustomResponse;
import com.scholarbee.backend.service.StudentQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/students/me")
public class StudentMyPageController {

    private final StudentQueryService studentQueryService;

    @GetMapping
    public ResponseEntity<CustomResponse<StudentMyPageResponseDto>> getMyPage(
            @AuthenticationPrincipal UserDetails userDetails) {

        String email = userDetails.getUsername();
        StudentMyPageResponseDto response = studentQueryService.getMyPage(email);

        return ResponseEntity.ok(
                CustomResponse.ok("마이페이지 조회 성공", response)
        );
    }
}