package com.funcoders.happy_pet_shop.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {

    @NotBlank(message = "INVALID_USER_NAME")
    @Size(max = 50, message = "INVALID_USER_NAME_LENGTH")
    String userName;

    @NotBlank(message = "INVALID_PHONE")
    @Pattern(
            regexp = "^(0|\\+84)[0-9]{9}$",
            message = "INVALID_PHONE_FORMAT"
    )
    String phone;

    @Size(max = 255, message = "INVALID_ADDRESS_LENGTH")
    String address;

    @NotBlank(message = "INVALID_PASSWORD")
    @Size(min = 4, max = 255, message = "INVALID_PASSWORD")
    String password;
}
