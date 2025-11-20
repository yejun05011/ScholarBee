package com.scholarbee.backend.service;

import com.scholarbee.backend.dto.ScholarshipCreateRequestDto;
import com.scholarbee.backend.dto.ScholarshipCreateResponseDto;
import com.scholarbee.backend.dto.ScholarshipDeleteResponseDto;
import com.scholarbee.backend.entity.Scholarship;
import com.scholarbee.backend.global.exception.CustomException;
import com.scholarbee.backend.repository.ScholarshipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScholarshipService {

    private final ScholarshipRepository scholarshipRepository;

    public ScholarshipCreateResponseDto createScholarship(ScholarshipCreateRequestDto req) {

        Scholarship scholarship = Scholarship.builder()
                .name(req.getName())
                .amount(req.getAmount())
                .foundation(req.getFoundation())
                .applyStart(req.getApply_start())
                .applyEnd(req.getApply_end())
                .build();

        Scholarship saved = scholarshipRepository.save(scholarship);

        return ScholarshipCreateResponseDto.builder()
                .scholarshipId(saved.getId())
                .name(saved.getName())
                .build();
    }

    public ScholarshipDeleteResponseDto deleteScholarship(Long scholarshipId) {

        Scholarship scholarship = scholarshipRepository.findById(scholarshipId)
                .orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "해당 장학금이 존재하지 않습니다."));

        scholarshipRepository.delete(scholarship);

        return ScholarshipDeleteResponseDto.builder()
                .deletedScholarshipId(scholarshipId)
                .build();
    }
}