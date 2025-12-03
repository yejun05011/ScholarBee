package com.scholarbee.backend.repository;

import com.scholarbee.backend.domain.entity.RssScholarship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RssScholarshipRepository extends JpaRepository<RssScholarship, Long> {

    Optional<RssScholarship> findByLink(String link);

    boolean existsByLink(String link);
}