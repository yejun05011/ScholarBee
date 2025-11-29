package com.scholarbee.backend.global.parser;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.util.ArrayList;
import java.util.List;

public class HtmlParagraphExtractor {

    /**
     * HUFS 게시판용 문단 추출기.
     * - 본문 대부분은 <div class="view-con"> 안에 존재
     * - 그 안의 <p>, <li> 텍스트만 깔끔하게 뽑아서 문단 리스트로 반환
     */
    public List<String> extractParagraphs(Document doc) {
        List<String> paragraphs = new ArrayList<>();

        if (doc == null || doc.body() == null) {
            return paragraphs;
        }

        // 1순위: HUFS 본문 영역
        Element root = doc.selectFirst("div.view-con");

        // 혹시 레이아웃이 조금 다른 글을 위한 fallback
        if (root == null) {
            root = doc.selectFirst("div.article-view, div.board-view, div.content, div#viewContent");
        }

        if (root == null) {
            return paragraphs;
        }

        // view-con 내부의 p, li 텍스트만 추출
        for (Element e : root.select("p, li")) {
            addIfNotBlank(paragraphs, e.text());
        }

        return paragraphs;
    }

    private void addIfNotBlank(List<String> list, String text) {
        if (text == null) return;
        // &nbsp; 제거 + 트림
        String trimmed = text.replace('\u00A0', ' ').trim();
        if (!trimmed.isEmpty() && trimmed.length() > 1) { // 한 글자짜리 기호만 있는 줄은 제외
            list.add(trimmed);
        }
    }
}
