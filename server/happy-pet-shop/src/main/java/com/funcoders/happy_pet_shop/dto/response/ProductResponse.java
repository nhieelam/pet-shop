package com.funcoders.happy_pet_shop.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductResponse {
    UUID id;
    String name;
    String description;
    BigDecimal price;

    String categoryName;

    String brand;
    String origin;
    String unit;

    int quantity;
    String imageUrl;

    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
