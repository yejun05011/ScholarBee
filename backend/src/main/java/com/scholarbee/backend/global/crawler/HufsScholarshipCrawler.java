package com.scholarbee.backend.global.crawler;

import com.scholarbee.backend.domain.dto.ScholarshipRawDto;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Component;

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

            for (var row : doc.select("table tbody tr")) {

                String name = row.select("td.td-subject a strong").text();
                if (name.isEmpty()) continue;

                String url = DOMAIN + row.select("td.td-subject a").attr("href");
                String foundation = row.select("td.td-write").text();
                String postedDate = row.select("td.td-date").text();

                Document detail = Jsoup.connect(url)
                        .userAgent("Mozilla/5.0")
                        .timeout(10000)
                        .get();

                // ★ 핵심 수정: board-view-content 존재 X
                Element content = detail.selectFirst("div.view-con");

                String rawHtml = content != null ? content.html() : "[NO_CONTENT]";

                results.add(
                        ScholarshipRawDto.builder()
                                .name(name)
                                .foundation(foundation)
                                .postedDate(postedDate)
                                .url(url)
                                .rawText(rawHtml)
                                .build()
                );
            }

        } catch (Exception e) {
            System.out.println("[HUFS Crawler Error] " + e.getMessage());
        }

        return results;
    }
}
