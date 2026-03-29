package com.funcoders.happy_pet_shop.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ListProductCreationRequest {

    @NotEmpty(message = "INVALID_PRODUCT_LIST")
    List<@Valid ProductCreationRequest> products;
}
