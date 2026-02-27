package com.funcoders.happy_pet_shop.controller;

import com.funcoders.happy_pet_shop.dto.response.ApiResponse;
import com.funcoders.happy_pet_shop.dto.request.LoginRequest;
import com.funcoders.happy_pet_shop.dto.response.LoginResponse;
import com.funcoders.happy_pet_shop.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest req) {
        LoginResponse data = authService.login(req);

        ApiResponse<LoginResponse> res = ApiResponse.<LoginResponse>builder()
                .success(true)
                .message("Login success")
                .data(data)
                .status(200)
                .errorCode(0)
                .timestamp(Instant.now())
                .build();

        return ResponseEntity.ok(res);
    }

    @PostMapping("/logout")
    public ApiResponse<Void> logout() {

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Logged out successfully")
                .status(HttpStatus.OK.value())
                .errorCode(0)
                .timestamp(Instant.now())
                .build();
    }
}