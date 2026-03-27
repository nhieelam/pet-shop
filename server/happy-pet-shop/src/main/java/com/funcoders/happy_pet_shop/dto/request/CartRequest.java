package com.funcoders.happy_pet_shop.dto.request;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Min;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartRequest {

    /** Use for product lines; omit when adding a pet. */
    UUID productId;

    /** Use for pet lines; omit when adding a product. */
    UUID petId;

    @Min(value = 0, message = "INVALID_QUANTITY")
    int quantity;

    @AssertTrue(message = "CART_ITEM_PRODUCT_OR_PET_EXCLUSIVE")
    boolean isProductOrPetExclusive() {
        boolean hasProduct = productId != null;
        boolean hasPet = petId != null;
        return hasProduct != hasPet;
    }
}
