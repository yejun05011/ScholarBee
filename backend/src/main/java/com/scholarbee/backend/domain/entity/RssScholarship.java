package com.scholarbee.backend.domain.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "rss_scholarship")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RssScholarship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="rss_scholarship_id")
    private Long id;

    private String title;

    @Column(unique = true, length = 500)
    private String link;

    private String postedDate;

    @Lob
    private String descriptionHtml;

    @Lob
    private String rawText;

    @OneToMany(mappedBy = "scholarship", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RssAttachment> attachments = new ArrayList<>();

    @Builder
    public RssScholarship(String title, String link, String postedDate,
                          String descriptionHtml, String rawText,
                          List<RssAttachment> attachments) {

        this.title = title;
        this.link = link;
        this.postedDate = postedDate;
        this.descriptionHtml = descriptionHtml;
        this.rawText = rawText;

        if (attachments != null) {
            attachments.forEach(a -> a.setScholarship(this));
            this.attachments = attachments;
        }
    }
}