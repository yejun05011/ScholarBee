package com.scholarbee.backend.domain.entity;

import com.scholarbee.backend.global.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "academic_records")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class AcademicRecord extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "academic_record_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    // 1~8학기 등으로 표시 (1=1학년1학기, 8=4학년2학기)
    private Integer semester;

    private Integer credits;

    @Column(precision = 3, scale = 2)
    private BigDecimal score; // 학생의 해당 학기 학점
}
