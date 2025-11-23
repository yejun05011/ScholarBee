package com.scholarbee.backend.domain.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "scholarships")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Scholarship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "scholarship_id")
    private Long id;

    /** 기본 정보 */
    @Column(nullable = false, length = 200)
    private String name;

    @Column(length = 200)
    private String foundation;

    @Column(length = 500)
    private String url;

    @Column(length = 20)
    private String postedDate;  // YYYY.MM.DD 형태 그대로 저장

    /** 지원 기간 */
    @Column(length = 20)
    private String applyStart;

    @Column(length = 20)
    private String applyEnd;

    /** 지원 금액 및 인원 */
    @Column(length = 50)
    private String amount; // ex: "100만원"

    @Column(length = 50)
    private String people; // ex: "30명"

    /** 리스트 형태로 저장되는 데이터 */
    @ElementCollection
    private List<String> targets = new ArrayList<>();

    @ElementCollection
    private List<String> requiredDocs = new ArrayList<>();

    /** 원문 저장 (검색, 재파싱, 학습용) */
    @Lob
    private String rawText;
}
