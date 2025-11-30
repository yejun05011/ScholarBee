package com.scholarbee.backend.service;

import com.scholarbee.backend.domain.dto.ScholarshipDeleteResponseDto;
import com.scholarbee.backend.domain.dto.ScholarshipParsedDto;
import com.scholarbee.backend.domain.dto.ScholarshipRawDto;
import com.scholarbee.backend.domain.entity.Scholarship;
import com.scholarbee.backend.global.BaseTimeEntity;
import com.scholarbee.backend.global.crawler.ScholarshipCrawler;
import com.scholarbee.backend.global.exception.CustomException;
import com.scholarbee.backend.global.parser.ScholarshipParser;
import com.scholarbee.backend.repository.ScholarshipRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScholarshipService extends BaseTimeEntity {

    private final ScholarshipRepository scholarshipRepository;
    private final ScholarshipCrawler crawler;

    // 👇 이제 이거 하나만 쓴다
    private final ScholarshipParser parser = new ScholarshipParser();

    /**
     * 장학 공지 전체 크롤링 + 파싱 + 저장
     */
    public int registerScholarships() {

        List<ScholarshipRawDto> crawled = crawler.crawl();
        int count = 0;

        for (ScholarshipRawDto raw : crawled) {

            // 1) 중복 제목 스킵
            if (scholarshipRepository.existsByName(raw.getName())) {
                continue;
            }

            try {
                // 2) 본문이 없으면 스킵
                if (raw.getRawText() == null || raw.getRawText().isBlank()) {
                    log.warn("[Skip] 본문 없음: {}", raw.getName());
                    continue;
                }

                // 3) HTML 전체를 한 번에 파싱
                ScholarshipParsedDto parsed = parser.parseAll(raw.getRawText());

                Scholarship s = Scholarship.builder()
                        .name(raw.getName())
                        .foundation(raw.getFoundation())
                        .url(raw.getUrl())
                        .postedDate(raw.getPostedDate())
                        .rawText(raw.getRawText())          // 프론트 렌더링용 HTML

                        .applyPeriod(parsed.getApplyPeriod())
                        .amount(parsed.getAmount())
                        .people(parsed.getPeople())
                        .targets(parsed.getTargets())
                        .requiredDocs(parsed.getRequiredDocs())
                        .build();

                scholarshipRepository.save(s);
                count++;

            } catch (Exception e) {
                log.error("[Scholarship Parsing Error] {}: {}", raw.getName(), e.getMessage());
            }
        }

        return count;
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