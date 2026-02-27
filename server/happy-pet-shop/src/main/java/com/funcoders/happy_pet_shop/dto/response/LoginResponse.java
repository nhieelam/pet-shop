package com.funcoders.happy_pet_shop.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {
    private String accessToken;
    private String tokenType;   // "Bearer"
    private long expiresIn;     // seconds

}