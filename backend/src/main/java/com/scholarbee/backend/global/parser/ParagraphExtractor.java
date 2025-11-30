package com.scholarbee.backend.global.parser;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ParagraphExtractor {

    public List<String> splitIntoParagraphs(String raw) {
        if (raw == null || raw.isBlank()) return List.of();

        String text = raw;

        // 1) 숫자 조항 (ex: 1. 내용)
        text = text.replaceAll("(\\d+)\\.\\s*", "\n$1. ");

        // 2) 한글 조항 (ex: 가. 내용)
        text = text.replaceAll("([가-힣])\\.\\s*", "\n$1. ");

        // 3) 괄호 번호 (ex: (1), (2), (3))
        text = text.replaceAll("\\((\\d+)\\)\\s*", "\n($1) ");

        // 4) dash 시작 (ex: - 제출서류)
        text = text.replaceAll("\\-\\s*", "\n- ");

        // 5) 별표 bullet
        text = text.replaceAll("\\*\\s*", "\n* ");

        // 6) 문장 끝 점(.)으로 문장 구분
        text = text.replaceAll("(?<=\\.)\\s*", "\n");

        // 7) 콜론(:) 뒤 문장 분리 (예: "3. 모집요건 :" → 문단 시작)
        text = text.replaceAll("(:)\\s*", "$1\n");

        // 8) 불필요한 중복 개행 제거
        text = text.replaceAll("\n{2,}", "\n");

        // 9) 최종 분리 후 정리
        return Arrays.stream(text.split("\n"))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toList());
    }

}
