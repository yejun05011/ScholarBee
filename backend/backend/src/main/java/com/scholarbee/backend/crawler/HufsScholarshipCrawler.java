package com.scholarbee.backend.crawler;

import com.scholarbee.backend.domain.dto.ScholarshipDto;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class HufsScholarshipCrawler implements ScholarshipCrawler {

    private static final String BASE_URL = "https://www.hufs.ac.kr/hufs/11283/subview.do";
    private static final String DOMAIN = "https://www.hufs.ac.kr";

    @Override
    public List<ScholarshipDto> crawl() {
        List<ScholarshipDto> scholarships = new ArrayList<>();
        try {
            Document doc = Jsoup.connect(BASE_URL).userAgent("Mozilla/5.0").get();
            Elements elements = doc.select("table tbody tr");

            for (Element row : elements) {
                String name = row.select("td.td-subject a strong").text();
                String url = DOMAIN + row.select("td.td-subject a").attr("href");
                String foundation = row.select("td.td-write").text();
                String applyEnd = row.select("td.td-date").text();

                if (!name.isEmpty()) {
                    scholarships.add(new ScholarshipDto(name, foundation, applyEnd, url));
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
