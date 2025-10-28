package com.scholarbee.backend.domain;

import com.scholarbee.backend.global.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "scholarships")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Scholarship extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "scholarship_id")
    private Long id;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 50)
    private String foundation;

    @Column(length = 50)
    private String amount;

    @Column(name = "apply_start")
    private LocalDate applyStart;

    @Column(name = "apply_end")
    private LocalDate applyEnd;

    @OneToOne(mappedBy = "scholarship", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Qualification qualification;

    @OneToMany(mappedBy = "scholarship", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Wishlist> wishlists = new ArrayList<>();
}
