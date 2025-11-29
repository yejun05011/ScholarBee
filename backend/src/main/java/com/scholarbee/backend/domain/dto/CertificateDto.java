package com.scholarbee.backend.domain.dto;

import com.scholarbee.backend.domain.entity.Certificate;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CertificateDto {

    private Long certificateId;
    private String name;
    private Integer score;

    public static CertificateDto from(Certificate cert) {
        return CertificateDto.builder()
                .certificateId(cert.getId())
                .name(cert.getCertificationName())
                .score(cert.getScore())
                .build();
    }
}
