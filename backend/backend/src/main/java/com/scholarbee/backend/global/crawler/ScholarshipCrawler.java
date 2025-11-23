package com.scholarbee.backend.global.crawler;

import com.scholarbee.backend.domain.dto.ScholarshipRawDto;

import java.util.List;

public interface ScholarshipCrawler {
    List<ScholarshipRawDto> crawl();
}
