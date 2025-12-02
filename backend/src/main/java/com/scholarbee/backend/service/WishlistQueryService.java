package com.scholarbee.backend.service;

import com.scholarbee.backend.domain.dto.WishlistListResponseDto;
import com.scholarbee.backend.domain.entity.Student;
import com.scholarbee.backend.domain.entity.Wishlist;
import com.scholarbee.backend.global.exception.CustomException;
import com.scholarbee.backend.global.response.CustomResponse;
import com.scholarbee.backend.repository.StudentRepository;
import com.scholarbee.backend.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistQueryService {

    private final WishlistRepository wishlistRepository;
    private final StudentRepository studentRepository;

    @Transactional(readOnly = true)
    public CustomResponse<List<WishlistListResponseDto>> getWishlist(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "존재하지 않는 학생입니다."));

        List<Wishlist> wishlists = wishlistRepository.findAllByStudent(student);

        List<WishlistListResponseDto> result = wishlists.stream()
                .map(w -> WishlistListResponseDto.builder()
                        .scholarshipId(w.getScholarship().getId())
                        .name(w.getScholarship().getName())
                        .amount(w.getScholarship().getAmount())
                        .foundation(w.getScholarship().getFoundation())
                        .applyPeriod(w.getScholarship().getApplyPeriod())
                        .build()
                )
                .toList();

        return CustomResponse.ok("내가 찜한 장학금 목록 조회 성공", result);
    }
}
