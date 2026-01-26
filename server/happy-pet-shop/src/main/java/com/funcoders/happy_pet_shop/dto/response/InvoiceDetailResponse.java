package com.funcoders.happy_pet_shop.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InvoiceDetailResponse {
    UUID id;

    InventoryResponse inventory;

    BigDecimal unitPrice;
    int quantity;
    BigDecimal totalPrice;
}
