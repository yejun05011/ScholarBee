package com.scholarbee.backend.global.parser;

public class SectionClassifier {

    /**
     * 한 줄이 섹션 제목인지 판별.
     * - ELIGIBILITY: 지원자격 / 대상
     * - REQUIRED_DOCS: 제출서류
     * - PERIOD: 세부일정 / 기간
     * - AMOUNT_PEOPLE: 선발인원 및 지원금액
     * 나머지는 null
     */
    public String classifySection(String line) {
        if (line == null) return null;

        String t = line.replaceAll("\\s+", "");  // 공백 제거

        if (t.isEmpty()) return null;

        // 지원자격 / 대상
        if (t.matches("^\\d+\\.?지원자격.*")
                || t.contains("지원자격")
                || t.contains("선발요건")
                || t.contains("지원대상")
                || t.contains("대상자")) {
            return "ELIGIBILITY";
        }

        // 제출서류
        if (t.matches("^\\d+\\.?제출서류.*")
                || t.contains("제출서류")
                || t.contains("구비서류")
                || t.contains("제출서류목록")) {
            return "REQUIRED_DOCS";
        }

        // 세부일정 / 기간
        if (t.matches("^\\d+\\.?세부일정.*")
                || t.contains("세부일정")
                || t.contains("지원기간")
                || t.contains("신청기간")
                || t.contains("접수기간")
                || t.contains("모집기간")) {
            return "PERIOD";
        }

        // 선발인원 + 금액
        if (t.matches("^\\d+\\.?선발인원및지원금액.*")
                || t.contains("선발인원및지원금액")
                || t.contains("선발인원및지원금")
                || t.contains("선발인원")
                || t.contains("모집인원")
                || t.contains("지원금액")
                || t.contains("장학금액")) {
            return "AMOUNT_PEOPLE";
        }

        return null;
    }
}
