package com.scholarbee.backend.controller;

import com.scholarbee.backend.domain.entity.RssScholarship;
import com.scholarbee.backend.repository.RssScholarshipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/scholarships")
public class RssController {

    private final RssScholarshipRepository scholarshipRepository;

    @GetMapping
    public List<RssScholarship> getAll() {
        return scholarshipRepository.findAll();
    }
}
