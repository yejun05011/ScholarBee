package com.scholarbee.backend.domain;

import com.scholarbee.backend.global.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "student_details")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class StudentDetail extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_detail_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column
    private Double gpa; // 평점

    @Column
    private Integer grade;

    @Column
    private Integer semester;

    @Column
    private Integer incomeBracket; // 소득분위

    @Column(length = 30)
    private String major;

    @Column
    private Integer volunteerHours; // 봉사시간

    @Column
    private String certifications; // 자격증

    @Column
    private Boolean isDisabled; // 장애 여부
}
