package com.funcoders.happy_pet_shop.controller;

import com.funcoders.happy_pet_shop.dto.request.UserRegisterRequest;
import com.funcoders.happy_pet_shop.dto.response.ApiResponse;
import com.funcoders.happy_pet_shop.dto.response.UserResponse;
import com.funcoders.happy_pet_shop.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

    UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@Valid @RequestBody UserRegisterRequest req) {
        return userService.register(req);
    }

    @GetMapping("/me")
    public ApiResponse<UserResponse> me(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ApiResponse.<UserResponse>builder()
                .success(true)
                .message("OK")
                .data(userService.getMe(userDetails.getUsername()))
                .status(200)
                .errorCode(0)
                .timestamp(Instant.now())
                .build();
    }

}
