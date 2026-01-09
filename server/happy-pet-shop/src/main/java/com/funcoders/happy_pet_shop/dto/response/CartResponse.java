package com.funcoders.happy_pet_shop.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartResponse {
    UUID id;

    Set<CartItemResponse> cartItems;

    LocalDateTime createdAt;

    LocalDateTime updatedAt;
}
