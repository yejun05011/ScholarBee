package com.scholarbee.backend.service;

import com.scholarbee.backend.domain.dto.WishlistResponseDto;
import com.scholarbee.backend.domain.entity.Scholarship;
import com.scholarbee.backend.domain.entity.Student;
import com.scholarbee.backend.domain.entity.Wishlist;
import com.scholarbee.backend.global.exception.CustomException;
import com.scholarbee.backend.global.response.CustomResponse;
import com.scholarbee.backend.repository.ScholarshipRepository;
import com.scholarbee.backend.repository.StudentRepository;
import com.scholarbee.backend.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final ScholarshipRepository scholarshipRepository;
    private final StudentRepository studentRepository;
    private final WishlistRepository wishlistRepository;

    @Transactional
    public CustomResponse<WishlistResponseDto> toggleWishlist(Long scholarshipId, Long studentId) {

        Scholarship scholarship = scholarshipRepository.findById(scholarshipId)
                .orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "존재하지 않는 장학금입니다."));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "존재하지 않는 학생입니다."));

        Optional<Wishlist> existing = wishlistRepository.findByStudentAndScholarship(student, scholarship);

        // 이미 찜한 상태면 취소
        if (existing.isPresent()) {
            wishlistRepository.delete(existing.get());

            WishlistResponseDto response = WishlistResponseDto.builder()
                    .scholarshipId(scholarshipId)
                    .isWished(false)
                    .build();

            return CustomResponse.ok("장학금 찜을 취소했습니다.", response);
        }

        // 찜 등록
        Wishlist wishlist = Wishlist.builder()
                .student(student)
                .scholarship(scholarship)
                .build();

        wishlistRepository.save(wishlist);

        WishlistResponseDto response = WishlistResponseDto.builder()
                .scholarshipId(scholarshipId)
                .isWished(true)
                .build();

        return CustomResponse.ok("장학금을 찜했습니다.", response);
    }
}
