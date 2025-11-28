package com.scholarbee.backend.service;

import com.scholarbee.backend.domain.dto.ScholarshipDeleteResponseDto;
import com.scholarbee.backend.domain.dto.ScholarshipParsedDto;
import com.scholarbee.backend.domain.dto.ScholarshipRawDto;
import com.scholarbee.backend.domain.entity.Scholarship;
import com.scholarbee.backend.global.crawler.HufsScholarshipCrawler;
import com.scholarbee.backend.global.exception.CustomException;
import com.scholarbee.backend.global.parser.MlInferenceService;
import com.scholarbee.backend.global.parser.ParagraphExtractor;
import com.scholarbee.backend.global.parser.ScholarshipParser;
import com.scholarbee.backend.repository.ScholarshipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScholarshipService {

    private final HufsScholarshipCrawler crawler;
    private final ParagraphExtractor extractor;
    private final MlInferenceService mlService;
    private final ScholarshipParser parser;
    private final ScholarshipRepository scholarshipRepository;

    public int registerScholarships() {

        // 장학 공지 크롤링
        List<ScholarshipRawDto> crawled = crawler.crawl();
        int count = 0;

        for (ScholarshipRawDto raw : crawled) {
            System.out.println("raw text before save: {}" + raw.getRawText());

            // 중복 체크
            if (scholarshipRepository.existsByName(raw.getName())) continue;

            // 문단 분리
            List<String> paragraphs = extractor.splitIntoParagraphs(raw.getRawText());

            ScholarshipParsedDto parsed = new ScholarshipParsedDto();

            // 문단마다 ML 라벨링 + 파싱
            for (String paragraph : paragraphs) {

                String label = mlService.predict(paragraph);

                switch (label) {
                    case "APPLY_PERIOD" -> parser.parseApplyPeriod(parsed, paragraph);
                    case "AMOUNT_PEOPLE" -> parser.parseAmount(parsed, paragraph);
                    case "TARGET" -> parser.parseTarget(parsed, paragraph);
                    case "REQUIRED_DOCS" -> parser.parseRequiredDocs(parsed, paragraph);
                }
            }

            // 엔티티 생성
            String finalFoundation =
                    parser.chooseFoundation(raw.getFoundation(), parsed.getFoundationCandidates());

            Scholarship s = Scholarship.builder()
                    .name(raw.getName())
                    .foundation(finalFoundation)
                    .url(raw.getUrl())
                    .postedDate(raw.getPostedDate())
                    .rawText(raw.getRawText())
                    .applyStart(parsed.getApplyStart())
                    .applyEnd(parsed.getApplyEnd())
                    .amount(parsed.getAmount())
                    .people(parsed.getPeople())
                    .targets(parsed.getTargets())
                    .requiredDocs(parsed.getRequiredDocs())
                    .build();

            scholarshipRepository.save(s);
            System.out.println("after save = {}" + s.getRawText());
            count++;
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