package com.scholarbee.backend.global.parser;

import com.scholarbee.backend.domain.dto.ScholarshipParsedDto;
import org.jsoup.Jsoup;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ScholarshipParser {

    // ex) "100만원", "1,000,000원"
    private static final Pattern AMOUNT_PATTERN =
            Pattern.compile("(\\d{1,3}(,\\d{3})*\\s*원|\\d+\\s*만원)");

    // ex) "4명"
    private static final Pattern PEOPLE_PATTERN =
            Pattern.compile("(\\d+)\\s*명");

    public ScholarshipParsedDto parseAll(String rawHtml) {
        ScholarshipParsedDto dto = new ScholarshipParsedDto();

        if (rawHtml == null || rawHtml.isBlank()) {
            return dto;
        }

        // HTML → 텍스트 한 줄
        String text = Jsoup.parse(rawHtml)
                .text()
                .replace('\u00A0', ' ')  // &nbsp;
                .replaceAll("\\s+", " ") // 공백 정리
                .trim();

        // 1) 기간
        dto.setApplyPeriod(extractApplyPeriod(text));

        // 2) 금액
        dto.setAmount(extractAmount(text));

        // 3) 인원
        dto.setPeople(extractPeople(text));

        // 4) 지원자격
        dto.setTargets(extractBetweenKeywords(text,
                "지원자격",  // 시작 키워드
                "제출서류"   // 끝 키워드
        ));

        // 5) 제출서류
        dto.setRequiredDocs(extractBetweenKeywords(text,
                "제출서류",
                "신청기간"   // 뒤에 오는 섹션
        ));

        return dto;
    }

    // ------------------- helper methods -------------------

    /**
     * 신청기간 / 지원기간 / 접수기간 중 하나 찾고,
     * 거기서부터 "까지" 나올 때까지 앞 부분 잘라서 반환.
     */
    private String extractApplyPeriod(String text) {
        String[] keys = {"신청기간", "지원기간", "접수기간"};

        for (String key : keys) {
            int idx = text.indexOf(key);
            if (idx != -1) {
                // 뒤에 80~120자 정도만 잘라 보기
                int end = Math.min(idx + 120, text.length());
                String candidate = text.substring(idx, end);

                int untilIdx = candidate.indexOf("까지");
                if (untilIdx != -1) {
                    candidate = candidate.substring(0, untilIdx + 2); // "까지" 포함
                }

                return candidate.trim();
            }
        }
        return null;
    }

    /** 금액: 첫 번째 "100만원", "1,000,000원" 같은 패턴 */
    private String extractAmount(String text) {
        Matcher m = AMOUNT_PATTERN.matcher(text);
        if (m.find()) {
            return m.group().trim();
        }
        return null;
    }

    /** 인원: 첫 번째 "4명" 같은 패턴 */
    private String extractPeople(String text) {
        Matcher m = PEOPLE_PATTERN.matcher(text);
        if (m.find()) {
            return m.group().trim();
        }
        return null;
    }

    /**
     * startKeyword ~ endKeyword 사이를 잘라서 섹션 텍스트로 반환.
     * ex) "지원자격" ~ "제출서류"
     */
    private String extractBetweenKeywords(String text, String startKeyword, String endKeyword) {
        int startIdx = text.indexOf(startKeyword);
        if (startIdx == -1) return null;

        int endIdx = text.indexOf(endKeyword, startIdx + startKeyword.length());
        if (endIdx == -1) {
            // 끝 키워드를 못 찾으면 뒤까지 전부
            endIdx = text.length();
        }

        String section = text.substring(startIdx, endIdx);
        return section.trim();
    }
}
