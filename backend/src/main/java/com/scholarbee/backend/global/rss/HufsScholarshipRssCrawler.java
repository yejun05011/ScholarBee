package com.scholarbee.backend.global.rss;

import com.scholarbee.backend.domain.entity.RssAttachment;
import com.scholarbee.backend.domain.entity.RssScholarship;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.safety.Safelist;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class HufsScholarshipRssCrawler {

    private static final String BASE_URL = "https://www.hufs.ac.kr/hufs/11283/subview.do";
    private static final String DOMAIN = "https://www.hufs.ac.kr";

    public List<RssScholarship> crawl() {

        List<RssScholarship> list = new ArrayList<>();

        try {
            Document doc = Jsoup.connect(BASE_URL)
                    .userAgent("Mozilla/5.0")
                    .timeout(15000)
                    .get();

            for (Element row : doc.select("table tbody tr")) {

                String title = row.select("td.td-subject a").text();
                if (title.isBlank()) continue;

                String href = row.select("td.td-subject a").attr("href");
                if (href.isBlank()) continue;

                String link = href.startsWith("http") ? href : DOMAIN + href;
                String posted = row.select("td.td-date").text();

                Document detail = Jsoup.connect(link)
                        .userAgent("Mozilla/5.0")
                        .timeout(15000)
                        .get();

                Element content = detail.selectFirst(".board-view-content, .view-con");
                String htmlContent = content != null ? content.html() : "";

                // rawText 생성
                String rawText = toRawText(htmlContent);

                // 첨부파일
                List<RssAttachment> files = new ArrayList<>();
                for (Element a : detail.select(".view-file a, a[href*=download]")) {
                    String fileName = a.text();
                    String url = a.attr("href");
                    if (!url.startsWith("http")) url = DOMAIN + url;

                    files.add(
                            RssAttachment.builder()
                                    .fileName(fileName)
                                    .url(url)
                                    .build()
                    );
                }

                list.add(
                        RssScholarship.builder()
                                .title(title)
                                .link(link)
                                .postedDate(posted)
                                .descriptionHtml(htmlContent)
                                .rawText(rawText)
                                .attachments(files)
                                .build()
                );
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }

    // rawText 메서드 포함
    private String toRawText(String html) {

        String cleaned = Jsoup.clean(
                html,
                Safelist.basic()
                        .addTags("br", "p", "ul", "ol", "li")
        );

        Document doc = Jsoup.parse(cleaned);

        doc.select("br").append("\\n");
        doc.select("p").prepend("\\n").append("\\n");

        for (Element li : doc.select("li")) {
            li.prepend("- ");
            li.append("\\n");
        }

        String text = doc.text();

        text = text.replace("\\n", "\n")
                .replaceAll("\n{2,}", "\n\n")
                .trim();

        return text;
    }
}
