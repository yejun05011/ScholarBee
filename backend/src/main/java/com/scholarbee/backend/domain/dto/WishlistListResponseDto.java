package com.scholarbee.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class WishlistListResponseDto {

    private Long rssScholarshipId;
    private String title;
    private Long count;
}
