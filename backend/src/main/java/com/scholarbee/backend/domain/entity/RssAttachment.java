package com.scholarbee.backend.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "rss_attachment")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RssAttachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    @Column(length = 1000)
    private String url;

    @ManyToOne
    @JoinColumn(name = "scholarship_id")
    @JsonIgnore
    private RssScholarship scholarship;

    @Builder
    public RssAttachment(String fileName, String url) {
        this.fileName = fileName;
        this.url = url;
    }

    public void setScholarship(RssScholarship scholarship) {
        this.scholarship = scholarship;
    }
}
