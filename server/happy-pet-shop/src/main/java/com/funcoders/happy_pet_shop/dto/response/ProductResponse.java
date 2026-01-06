package com.funcoders.happy_pet_shop.dto.response;

import com.funcoders.happy_pet_shop.constant.UserStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductResponse {
    String id;
    String productName;
    String description;
    BigDecimal price;
    Integer amount;
    LocalDateTime createdAt;
}
