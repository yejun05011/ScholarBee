package com.scholarbee.backend.controller;

import com.scholarbee.backend.dto.ScholarshipCreateRequestDto;
import com.scholarbee.backend.dto.ScholarshipCreateResponseDto;
import com.scholarbee.backend.global.response.CustomResponse;
import com.scholarbee.backend.service.ScholarshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/scholarships")
public class ScholarshipController {

    private final ScholarshipService scholarshipService;

    @PostMapping
    public ResponseEntity<CustomResponse<ScholarshipCreateResponseDto>> createScholarship(
            @RequestBody ScholarshipCreateRequestDto request) {

        ScholarshipCreateResponseDto response = scholarshipService.createScholarship(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(CustomResponse.created("장학금이 등록되었습니다.", response));
    }
}