package com.funcoders.happy_pet_shop.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PurchaseDetailResponse {
    UUID id;

    InventoryResponse inventory;

    BigDecimal unitPrice;

    int quantity;

    BigDecimal totalPrice;
}
