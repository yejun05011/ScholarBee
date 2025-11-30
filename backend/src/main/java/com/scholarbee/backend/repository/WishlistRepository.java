package com.scholarbee.backend.repository;

import com.scholarbee.backend.domain.entity.Scholarship;
import com.scholarbee.backend.domain.entity.Student;
import com.scholarbee.backend.domain.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    Optional<Wishlist> findByStudentAndScholarship(Student student, Scholarship scholarship);

    List<Wishlist> findAllByStudent(Student student);
}