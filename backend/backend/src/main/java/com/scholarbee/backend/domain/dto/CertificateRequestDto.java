package com.scholarbee.backend.domain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class CertificateRequestDto {

    private String name;
    private String issuingAuthority;
    private LocalDate issueDate;
    private LocalDate expiryDate;
    private Integer score;
}