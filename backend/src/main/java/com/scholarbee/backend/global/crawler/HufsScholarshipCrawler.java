package com.scholarbee.backend.global.crawler;

import com.scholarbee.backend.domain.dto.ScholarshipRawDto;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class HufsScholarshipCrawler implements ScholarshipCrawler {

    private static final String BASE_URL = "https://www.hufs.ac.kr/hufs/11283/subview.do";
    private static final String DOMAIN = "https://www.hufs.ac.kr";

    @Override
    public List<ScholarshipRawDto> crawl() {
        List<ScholarshipRawDto> results = new ArrayList<>();

        try {
            Document doc = Jsoup.connect(BASE_URL)
                    .userAgent("Mozilla/5.0")
                    .timeout(10000)
                    .get();

            Elements rows = doc.select("table tbody tr");

            for (Element row : rows) {
                String title = row.select("td.td-subject a strong").text();
                String link = DOMAIN + row.select("td.td-subject a").attr("href");
                String foundation = row.select("td.td-write").text();
                String date = row.select("td.td-date").text();

                if (title.isEmpty()) continue;

                // 상세 페이지 본문 불러오기 (ML용)
                Document detail = Jsoup.connect(link)
                        .userAgent("Mozilla/5.0")
                        .timeout(10000)
                        .get();

                Element content = detail.selectFirst(".board-article, .article, .article-text, .article-view");
                String text = content != null ? content.text() : "";

                // ML에 넘길 원본 데이터 DTO
                ScholarshipRawDto dto = ScholarshipRawDto.builder()
                        .name(title)
                        .url(link)
                        .foundation(foundation)
                        .postedDate(date)
                        .rawText(text)
                        .build();

                results.add(dto);
            }

        } catch (IOException e) {
            System.err.println("[HUFS Crawler Error] " + e.getMessage());
        }

        return results;
    }
}
