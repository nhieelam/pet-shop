package com.funcoders.happy_pet_shop.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PetCreationRequest {

    @NotBlank(message = "INVALID_PET_NAME")
    @Size(max = 150, message = "INVALID_PET_NAME_LENGTH")
    String name;

    @NotBlank(message = "INVALID_PET_SPECIES")
    @Size(max = 100, message = "INVALID_PET_SPECIES_LENGTH")
    String species;

    @NotBlank(message = "INVALID_PET_BREED")
    @Size(max = 100, message = "INVALID_PET_BREED_LENGTH")
    String breed;

    @NotNull(message = "INVALID_PET_AGE")
    @Min(value = 0, message = "INVALID_PET_AGE")
    Integer ageInMonths;

    @NotBlank(message = "INVALID_PET_GENDER")
    @Size(max = 10, message = "INVALID_PET_GENDER_LENGTH")
    String gender;

    @NotNull(message = "INVALID_PET_PRICE")
    @DecimalMin(value = "0.0", inclusive = false, message = "INVALID_PET_PRICE")
    BigDecimal price;

    @NotNull(message = "INVALID_PET_VACCINATED_STATUS")
    Boolean vaccinated;
}
