package com.scholarbee.backend.repository;

import com.scholarbee.backend.domain.entity.Scholarship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScholarshipRepository extends JpaRepository<Scholarship, Long> {
    boolean existsByName(String name);
}
