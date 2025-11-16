package com.scholarbee.backend.dto;

import com.scholarbee.backend.entity.Volunteer;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class VolunteerDto {

    private Long volunteerId;
    private String organization;
    private String activity;
    private Integer hours;
    private String description;

    public static VolunteerDto from(Volunteer v) {
        return VolunteerDto.builder()
                .volunteerId(v.getId())
                .organization(v.getOrganization())
                .activity(v.getActivity())
                .hours(v.getHours())
                .description(v.getDescription())
                .build();
    }
}
