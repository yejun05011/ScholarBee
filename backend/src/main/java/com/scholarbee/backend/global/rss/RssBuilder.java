package com.scholarbee.backend.global.rss;

import com.scholarbee.backend.domain.entity.RssAttachment;
import com.scholarbee.backend.domain.entity.RssScholarship;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RssBuilder {

    public String build(List<RssScholarship> items) {
        StringBuilder sb = new StringBuilder();

        sb.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        sb.append("<rss version=\"2.0\"><channel>");
        sb.append("<title>HUFS Scholarship RSS</title>");
        sb.append("<link>https://www.hufs.ac.kr</link>");
        sb.append("<description>한국외대 장학금 공지 RSS Feed</description>");

        for (RssScholarship item : items) {
            sb.append("<item>");
            sb.append("<title>").append(item.getTitle()).append("</title>");
            sb.append("<link>").append(item.getLink()).append("</link>");
            sb.append("<pubDate>").append(item.getPostedDate()).append("</pubDate>");

            sb.append("<description><![CDATA[")
                    .append(item.getDescriptionHtml())
                    .append("]]></description>");

            sb.append("<attachments>");
            for (RssAttachment a : item.getAttachments()) {
                sb.append("<file name=\"")
                        .append(a.getFileName())
                        .append("\" url=\"")
                        .append(a.getUrl())
                        .append("\"/>");
            }
            sb.append("</attachments>");

            sb.append("</item>");
        }

        sb.append("</channel></rss>");
        return sb.toString();
    }
}
