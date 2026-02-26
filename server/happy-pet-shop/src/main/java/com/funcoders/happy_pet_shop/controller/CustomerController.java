package com.funcoders.happy_pet_shop.controller;

import com.funcoders.happy_pet_shop.dto.response.ApiResponse;
import com.funcoders.happy_pet_shop.service.CustomerService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerController {

    CustomerService customerService;

}
