package com.funcoders.happy_pet_shop.dto.response;

import com.funcoders.happy_pet_shop.constant.ItemStatus;
import com.funcoders.happy_pet_shop.entity.Category;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {

    private UUID id;

    private String name;
    private String description;

    private String imageUrl;
    private BigDecimal basePrice;

    private ItemStatus status;

    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}