package com.scholarbee.backend.controller;

import com.scholarbee.backend.domain.dto.StudentMyPageResponseDto;
import com.scholarbee.backend.domain.dto.WishlistListResponseDto;
import com.scholarbee.backend.global.jwt.CustomUserDetails;
import com.scholarbee.backend.global.response.CustomResponse;
import com.scholarbee.backend.service.StudentQueryService;
import com.scholarbee.backend.service.WishlistQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/students/me")
public class StudentMyPageController {

    private final StudentQueryService studentQueryService;
    private final WishlistQueryService wishlistQueryService;

    /**
     * 마이페이지 조회
     */
    @GetMapping
    public ResponseEntity<CustomResponse<StudentMyPageResponseDto>> getMyPage(
            @AuthenticationPrincipal UserDetails userDetails) {

        String email = userDetails.getUsername();
        StudentMyPageResponseDto response = studentQueryService.getMyPage(email);

        return ResponseEntity.ok(
                CustomResponse.ok("마이페이지 조회 성공", response)
        );
    }

    /**
     * 내가 찜한 장학금 목록 조회
     */
    @GetMapping("/wishlists/scholarships")
    public ResponseEntity<CustomResponse<List<WishlistListResponseDto>>> getMyWishlists(
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        Long studentId = user.getStudentId();

        return ResponseEntity.ok(wishlistQueryService.getWishlist(studentId));
    }

}