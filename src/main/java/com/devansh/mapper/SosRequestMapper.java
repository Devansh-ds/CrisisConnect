package com.devansh.mapper;

import com.devansh.model.SosRequest;
import com.devansh.response.SosRequestDto;
import org.springframework.stereotype.Service;

@Service
public class SosRequestMapper {

    public SosRequestDto requestToSosRequestDto(SosRequest sosRequest) {

        return SosRequestDto
                .builder()
                .id(sosRequest.getId())
                .user_id(sosRequest.getUser().getId())
                .sosStatus(sosRequest.getStatus())
                .createdAt(sosRequest.getCreatedAt())
                .updatedAt(sosRequest.getUpdatedAt())
                .latitude(sosRequest.getLatitude())
                .longitude(sosRequest.getLongitude())
                .message(sosRequest.getMessage())
                .build();
    }

}
