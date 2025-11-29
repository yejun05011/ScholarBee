package com.scholarbee.backend.domain.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="scholarships")
public class Scholarship {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="scholar_id")
    private Long id;

    private String name;            // 제목 (짧음 → VARCHAR로 충분)

    private String foundation;      // 재단명 (짧음)

    private String url;             // 원문 URL

    private String postedDate;      // 게시일자 (varchar)

    @Lob
    private String rawText;         // 상세 본문 전체

    // ─────────────── 파싱 결과 ───────────────

    @Lob
    private String applyPeriod;     // 기간 전체 문구 (예: "2025.03.01 ~ 2025.03.31")

    @Lob
    private String amount;          // 금액 문구 (예: "등록금 전액", "최대 200만원")

    @Lob
    private String people;          // 인원 문구 (예: "OO명")

    @Lob
    private String targets;         // 지원자격 전체 문단

    @Lob
    private String requiredDocs;    // 제출서류 전체 문단
}
