package com.scholarbee.backend.controller;

import com.scholarbee.backend.domain.dto.ScholarshipCreateRequestDto;
import com.scholarbee.backend.domain.dto.ScholarshipCreateResponseDto;
import com.scholarbee.backend.domain.dto.ScholarshipDeleteResponseDto;
import com.scholarbee.backend.global.crawler.HufsScholarshipCrawler;
import com.scholarbee.backend.global.response.CustomResponse;
import com.scholarbee.backend.service.ScholarshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/scholarships")
public class ScholarshipController {

    private final ScholarshipService scholarshipService;
    private final HufsScholarshipCrawler hufsScholarshipCrawler;

    @PostMapping
    public ResponseEntity<CustomResponse<ScholarshipCreateResponseDto>> createScholarship(
            @RequestBody ScholarshipCreateRequestDto request
    ) {

        ScholarshipCreateResponseDto response = scholarshipService.createScholarship(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(CustomResponse.created("장학금이 등록되었습니다.", response));
    }

    @DeleteMapping("/{scholarshipId}")
    public ResponseEntity<CustomResponse<ScholarshipDeleteResponseDto>> deleteScholarship(
            @PathVariable Long scholarshipId) {

        ScholarshipDeleteResponseDto response = scholarshipService.deleteScholarship(scholarshipId);

        return ResponseEntity.ok(
                CustomResponse.ok("장학금이 성공적으로 삭제되었습니다.", response)
        );
    }
}