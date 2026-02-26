package com.funcoders.happy_pet_shop.controller;

import com.funcoders.happy_pet_shop.dto.request.UserRegisterRequest;
import com.funcoders.happy_pet_shop.dto.response.UserResponse;
import com.funcoders.happy_pet_shop.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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

}
