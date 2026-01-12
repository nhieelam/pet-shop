package com.funcoders.happy_pet_shop.dto.response;

import com.funcoders.happy_pet_shop.constant.UserStatus;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SupplierResponse {
    UUID id;

    String name;

    String email;

    String phone;

    String address;

    UserStatus status;

    LocalDateTime createdAt;

    LocalDateTime updatedAt;
}
