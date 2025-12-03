package com.scholarbee.backend.domain.entity;

import com.scholarbee.backend.global.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "qualifications")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Qualification extends BaseTimeEntity {

    @Id
    @Column(name = "scholar_id")
    private Long id; // PK 이면서 FK

    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scholar_id")
    private RssScholarship rssScholarship;

    @Column(name = "min_gpa", precision = 3, scale = 2)
    private BigDecimal minGpa;

    @Column(name = "allowed_grade")
    private Byte allowedGrade;

    private String major;

    @Column(name = "max_income")
    private Integer maxIncome;
}
