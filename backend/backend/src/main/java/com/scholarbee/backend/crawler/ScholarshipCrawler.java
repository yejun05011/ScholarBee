package com.scholarbee.backend.crawler;

import com.scholarbee.backend.domain.dto.ScholarshipDto;

import java.util.List;

public interface ScholarshipCrawler {
    List<ScholarshipDto> crawl();
}
