package com.funcoders.happy_pet_shop.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InvoiceDetailCreationRequest {

    @NotNull(message = "INVALID_INVENTORY")
    UUID inventoryId;

    @Min(value = 1, message = "INVALID_QUANTITY")
    int quantity;
}
