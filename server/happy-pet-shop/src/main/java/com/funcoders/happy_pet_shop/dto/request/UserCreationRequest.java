package com.funcoders.happy_pet_shop.dto.request;

import jakarta.validation.constraints.Email;
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

    @NotBlank(message = "INVALID_USERNAME")
    @Size(min = 3, max = 30, message = "INVALID_USERNAME_LENGTH")
    @Pattern(
            regexp = "^[a-zA-Z0-9._-]+$",
            message = "INVALID_USERNAME_FORMAT"
    )
    String username;

    @NotBlank(message = "INVALID_PHONE")
    @Pattern(
            regexp = "^(0|\\+84)[0-9]{9}$",
            message = "INVALID_PHONE_FORMAT"
    )
    String phone;

    @Size(max = 255, message = "INVALID_ADDRESS_LENGTH")
    String address;

    @NotBlank(message = "INVALID_PASSWORD")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$",
            message = "INVALID_PASSWORD_FORMAT"
    )
    String password;
}