package com.funcoders.happy_pet_shop.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartCreationRequest {
    @NotNull(message = "INVALID_CUSTOMER_ID")
    UUID customerId;
}

