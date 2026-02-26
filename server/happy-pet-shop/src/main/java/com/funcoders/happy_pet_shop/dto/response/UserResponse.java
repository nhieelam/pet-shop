package com.funcoders.happy_pet_shop.dto.response;

import com.funcoders.happy_pet_shop.constant.UserRole;
import com.funcoders.happy_pet_shop.constant.UserStatus;
import lombok.*;
import java.util.UUID;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    private UUID id;
    private String username;
    private String phone;
    private String address;
    private UserRole role;
    private UserStatus status;
    private Instant createdAt;
}