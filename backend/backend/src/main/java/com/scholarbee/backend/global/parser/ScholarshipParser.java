package com.scholarbee.backend.global.parser;

import com.scholarbee.backend.domain.dto.ScholarshipParsedDto;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class ScholarshipParser {

    /** 1) 지원기간 파싱 */
    public ScholarshipParsedDto parseApplyPeriod(ScholarshipParsedDto dto, String paragraph) {
        Pattern p1 = Pattern.compile("(\\d{4}\\.\\s*\\d{1,2}\\.\\s*\\d{1,2})");
        Pattern p2 = Pattern.compile("~\\s*(\\d{1,2}\\.\\s*\\d{1,2})");

        Matcher m1 = p1.matcher(paragraph);
        Matcher m2 = p2.matcher(paragraph);

        if (m1.find()) dto.setApplyStart(m1.group(1).replaceAll("\\s+", ""));
        if (m2.find() && dto.getApplyStart() != null) {
            String endRaw = m2.group(1).replaceAll("\\s+", "");
            dto.setApplyEnd(dto.getApplyStart().substring(0, 4) + "." + endRaw);
        }

        return dto;
    }

    /** 2) 지원금/인원 파싱 */
    public ScholarshipParsedDto parseAmount(ScholarshipParsedDto dto, String paragraph) {
        Pattern money = Pattern.compile("(\\d+\\s*만원)");
        Pattern people = Pattern.compile("(\\d+\\s*명)");

        Matcher m1 = money.matcher(paragraph);
        if (m1.find()) dto.setAmount(m1.group(1).replaceAll("\\s+", ""));

        Matcher m2 = people.matcher(paragraph);
        if (m2.find()) dto.setPeople(m2.group(1).replaceAll("\\s+", ""));

        return dto;
    }

    /** 3) 지원 자격 */
    public ScholarshipParsedDto parseTarget(ScholarshipParsedDto dto, String paragraph) {
        dto.getTargets().add(paragraph.trim());
        return dto;
    }

    /** 4) 제출 서류 */
    public ScholarshipParsedDto parseRequiredDocs(ScholarshipParsedDto dto, String paragraph) {
        dto.getRequiredDocs().add(paragraph.trim());
        return dto;
    }

    /** 5) OTHER: 재단명 추출 */
    public ScholarshipParsedDto parseOther(ScholarshipParsedDto dto, String paragraph) {

        dto.getOtherLines().add(paragraph);

        // 재단명 패턴
        String[] patterns = {
                "([가-힣A-Za-z]+장학재단)",
                "([가-힣A-Za-z]+장학회)",
                "([가-힣A-Za-z]+재단법인)",
                "([가-힣A-Za-z]+재단)",
                "([가-힣A-Za-z]+교육재단)",
                "([가-힣A-Za-z]+고등교육재단)"
        };

        for (String ptn : patterns) {
            Matcher m = Pattern.compile(ptn).matcher(paragraph);
            while (m.find()) {
                dto.getFoundationCandidates().add(m.group(1));
            }
        }

        return dto;
    }

    /** 6) 최종 재단명 선택 로직 */
    public String chooseFoundation(String crawledFoundation, List<String> candidates) {

        if (crawledFoundation != null && !crawledFoundation.isEmpty()) {
            return crawledFoundation;
        }

        if (!candidates.isEmpty()) {
            return candidates.get(0); // 가장 처음 발견된 재단명을 선택
        }

        return null;
    }
}