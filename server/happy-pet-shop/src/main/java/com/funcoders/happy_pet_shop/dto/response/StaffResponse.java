package com.funcoders.happy_pet_shop.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StaffResponse {
    UUID id;

    UserResponse user;

    int shift;
}
