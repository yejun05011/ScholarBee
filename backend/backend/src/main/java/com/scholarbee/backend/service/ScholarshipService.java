package com.scholarbee.backend.service;

import com.scholarbee.backend.dto.ScholarshipCreateRequestDto;
import com.scholarbee.backend.dto.ScholarshipCreateResponseDto;
import com.scholarbee.backend.entity.Scholarship;
import com.scholarbee.backend.repository.ScholarshipRepository;
import lombok.RequiredArgsConstructor;
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
}