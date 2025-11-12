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

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Volunteer> volunteers = new ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AcademicRecord> academicRecords = new ArrayList<>();

    public void updateDetails(String department, Boolean isDisabled) {
        if (department != null) this.department = department;
        if (isDisabled != null) this.disabled = isDisabled;
    }
}
