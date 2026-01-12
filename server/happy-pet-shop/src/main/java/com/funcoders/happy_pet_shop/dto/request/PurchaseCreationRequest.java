package com.funcoders.happy_pet_shop.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.Set;
import java.util.UUID;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PurchaseCreationRequest {
    @NotNull(message = "INVALID_STAFF_ID")
    UUID staffId;

    @NotNull(message = "INVALID_SUPPLIER_ID")
    UUID supplierId;

    @NotEmpty(message = "INVALID_PURCHASE_DETAILS")
    @Valid
    Set<PurchaseDetailCreationRequest> purchaseDetails;
}
