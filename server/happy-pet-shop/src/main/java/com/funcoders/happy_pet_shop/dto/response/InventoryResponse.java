package com.funcoders.happy_pet_shop.dto.response;

import com.funcoders.happy_pet_shop.constant.InventoryStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class InventoryResponse {
    UUID id;

    ProductResponse product;

    int quantity;

    InventoryStatus status;

    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}

