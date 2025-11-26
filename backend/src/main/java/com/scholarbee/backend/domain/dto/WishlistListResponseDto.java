package com.scholarbee.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class WishlistListResponseDto {

    private Long scholarshipId;
    private String name;
    private String amount;
    private String foundation;
    private String applyStart;
    private String applyEnd;
}
