package com.funcoders.happy_pet_shop.dto.request;

import com.funcoders.happy_pet_shop.constant.PaymentMethod;
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
public class InvoiceCreationRequest {

    UUID staffId;

    @NotNull(message = "INVALID_CUSTOMER")
    UUID customerId;

    String shippingAddress;

    @NotNull(message = "INVALID_PAYMENT_METHOD")
    PaymentMethod paymentMethod;

    UUID promotionId;

    @NotEmpty(message = "INVALID_INVOICE_DETAILS")
    Set<InvoiceDetailCreationRequest> invoiceDetails;
}
