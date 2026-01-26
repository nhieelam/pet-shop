package com.funcoders.happy_pet_shop.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.funcoders.happy_pet_shop.constant.InventoryStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class InventoryResponse {
    UUID id;

    ProductResponse product;

    int quantity;

    InventoryStatus status;

    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}

