package com.funcoders.happy_pet_shop.controller;

import com.funcoders.happy_pet_shop.dto.request.AuthRequest;
import com.funcoders.happy_pet_shop.dto.request.IntrospectRequest;
import com.funcoders.happy_pet_shop.dto.request.LogoutRequest;
import com.funcoders.happy_pet_shop.dto.request.RefreshRequest;
import com.funcoders.happy_pet_shop.dto.request.UserCreationRequest;
import com.funcoders.happy_pet_shop.dto.response.ApiResponse;
import com.funcoders.happy_pet_shop.dto.response.AuthResponse;
import com.funcoders.happy_pet_shop.dto.response.IntrospectResponse;
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

    @PostMapping("/register")
    public ApiResponse<AuthResponse> register(@Valid @RequestBody UserCreationRequest request) {
        customerService.createCustomer(request);

        AuthResponse response = authService.authenticate(
                AuthRequest.builder()
                        .userName(request.getUsername()) 
                        .password(request.getPassword())
                        .build()
        );

        return new ApiResponse<>(response, "Register successfully");
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        AuthResponse response = authService.authenticate(request);

        return new ApiResponse<AuthResponse>(response, "login successfully");
    }

    @PostMapping("/logout")
    public ApiResponse<String> logout(@Valid @RequestBody LogoutRequest request) throws JOSEException, ParseException {
        authService.logout(request);
        return new ApiResponse<>(null, "Logout successfully");
    }

    @PostMapping("/introspect")
    public ApiResponse<IntrospectResponse> introspect(@Valid @RequestBody IntrospectRequest request) throws JOSEException, ParseException {
        IntrospectResponse response = authService.introspect(request);
        return new ApiResponse<IntrospectResponse>(response, "Introspect successfully");
    }

    @PostMapping("/refresh")
    public ApiResponse<AuthResponse> refresh(@Valid @RequestBody RefreshRequest request) throws ParseException, JOSEException {
        AuthResponse response = authService.refreshToken(request);

        return new ApiResponse(response, "Refresh token successfully");
    }
}
