package com.scholarbee.backend.controller;

import com.scholarbee.backend.domain.dto.WishlistResponseDto;
import com.scholarbee.backend.global.jwt.CustomUserDetails;
import com.scholarbee.backend.global.response.CustomResponse;
import com.scholarbee.backend.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/scholarships")
public class WishlistController {

    private final WishlistService wishlistService;

    /**
     * 토글형 찜
     */
    @PostMapping("/{scholarshipId}/wishlists")
    public CustomResponse<WishlistResponseDto> toggleWishlist(
            @PathVariable Long scholarshipId,
            @AuthenticationPrincipal CustomUserDetails user
            ) {
        Long studentId = user.getStudentId();

        return wishlistService.toggleWishlist(scholarshipId, studentId);
    }
}
