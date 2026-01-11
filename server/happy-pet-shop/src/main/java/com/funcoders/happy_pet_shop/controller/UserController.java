package com.funcoders.happy_pet_shop.controller;

import com.funcoders.happy_pet_shop.dto.request.ChangePasswordRequest;
import com.funcoders.happy_pet_shop.dto.request.UserCreationRequest;
import com.funcoders.happy_pet_shop.dto.request.UserUpdateRequest;
import com.funcoders.happy_pet_shop.dto.response.ApiResponse;
import com.funcoders.happy_pet_shop.dto.response.UserResponse;
import com.funcoders.happy_pet_shop.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

    UserService userService;

    // Tạo user mới, chỉ admin mới được tạo
    @PostMapping
    public ApiResponse<UserResponse> createUser(@Valid @RequestBody UserCreationRequest request) {
        UserResponse response = userService.createUser(request);
        return new ApiResponse<>(response, "Create user successfully");
    }

    // Lấy tất cả users, chỉ admin
    @GetMapping
    public ApiResponse<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        return new ApiResponse<>(users, "List of users");
    }

    // Lấy user theo id, admin hoặc chính user
    @GetMapping("/{id}")
    public ApiResponse<UserResponse> getUserById(@PathVariable UUID id) {
        UserResponse user = userService.getUserById(id);
        return new ApiResponse<>(user, "User details");
    }

    // Cập nhật user, admin hoặc chính user
    @PutMapping("/{id}")
    public ApiResponse<UserResponse> updateUser(@PathVariable UUID id, @RequestBody UserUpdateRequest request) {
        UserResponse updated = userService.updateUser(id, request);
        return new ApiResponse<>(updated, "User updated successfully");
    }

    // Xóa user, chỉ admin
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
        return new ApiResponse<>(null, "User deleted successfully");
    }

    @PostMapping("/{id}")
    public ApiResponse<Void> updatePassword(@PathVariable UUID id, ChangePasswordRequest request) {
        userService.updatePassword(id, request);
        return new ApiResponse<>(null, "Update password successfully");
    }

}
