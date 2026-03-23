package com.funcoders.happy_pet_shop.dto.request;

import com.funcoders.happy_pet_shop.constant.PaymentMethod;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewRequest {
    @NotNull(message = "INVALID_CUSTOMER")
    UUID customerId;

    @NotBlank(message = "INVALID_SHIPPING_ADDRESS")
    @Size(max = 255)
    String shippingAddress;

    @NotEmpty(message = "INVALID_REVIEW_DETAILS")
    List<@Valid ReviewDetailRequest> details;
}