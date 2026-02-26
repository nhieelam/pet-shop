package com.funcoders.happy_pet_shop.controller;

import com.funcoders.happy_pet_shop.service.AuthService;
import com.funcoders.happy_pet_shop.service.CustomerService;
import com.funcoders.happy_pet_shop.service.UserService;
import com.nimbusds.jose.JOSEException;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController {
    AuthService authService;
    CustomerService customerService;
    UserService UserService;


}
