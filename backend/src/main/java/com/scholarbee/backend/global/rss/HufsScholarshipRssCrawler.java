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

                // 상세 페이지
                Document detail = Jsoup.connect(link)
                        .userAgent("Mozilla/5.0")
                        .timeout(15000)
                        .get();

                Element content = detail.selectFirst(
                        ".board-view-content, .view-con, .article, #content, #article"
                );

                String htmlContent = "";
                if (content != null) {

                    // 1) 상대경로 이미지 절대 경로로 변환
                    for (Element img : content.select("img")) {
                        String src = img.attr("src");
                        if (src != null && !src.startsWith("http")) {
                            img.attr("src", DOMAIN + src);
                        }
                    }

                    // 2) 스타일 정제된 HTML 생성
                    htmlContent = cleanHtml(content.html());
                }

                // 3) rawText 생성
                String rawText = toRawText(htmlContent);

                // 4) 첨부파일 파싱
                List<RssAttachment> files = new ArrayList<>();
                for (Element a : detail.select(".view-file a, a[href*=download]")) {

                    String fileName = a.text();
                    String url = a.attr("href");

                    if (!url.startsWith("http")) {
                        url = DOMAIN + url;
                    }

                    files.add(
                            RssAttachment.builder()
                                    .fileName(fileName)
                                    .url(url)
                                    .build()
                    );
                }

                // 5) 최종 엔티티 생성
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


    // ============================================
    //  🔥 HTML 정제 (스타일 제거 + img 보존)
    // ============================================
    private String cleanHtml(String html) {

        if (html == null) return "";

        Safelist safelist = Safelist.relaxed()
                .addTags("img")
                .addAttributes("img", "src", "alt", "title", "width", "height")
                .removeAttributes("span", "style")
                .removeAttributes("p", "style")
                .removeAttributes("div", "style")
                .removeAttributes("table", "style")
                .removeAttributes("td", "style")
                .removeAttributes("tr", "style");

        return Jsoup.clean(html, safelist);
    }


    // ============================================
    //  🔥 추천 알고리즘용 raw text 생성
    // ============================================
    private String toRawText(String html) {

        if (html == null) return "";

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

        return text.replace("\\n", "\n")
                .replaceAll("\n{2,}", "\n\n")
                .trim();
    }
}