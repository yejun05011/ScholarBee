package com.scholarbee.backend.entity;

import com.scholarbee.backend.global.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "students")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Student extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long id;

    private String name;

    private String department;

    private Integer grade;

    private Boolean disabled;

    private String email;

    private String password;

    private Integer incomeBracket;

    private Double gpa; // 학생의 전체 학점 평균

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Volunteer> volunteers = new ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AcademicRecord> academicRecords = new ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Certificate> certificates = new ArrayList<>();

    public void updateDetails(String department, Boolean isDisabled, Integer incomeBracket, Integer grade) {
        if (department != null) this.department = department;
        if (isDisabled != null) this.disabled = isDisabled;
        if (incomeBracket != null) this.incomeBracket = incomeBracket;
        this.grade = grade;
    }

    public void updateGpa(Double gpa) {
        this.gpa = gpa;
    }
}
