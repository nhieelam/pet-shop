package com.funcoders.happy_pet_shop.service;

import com.funcoders.happy_pet_shop.constant.UserRole;
import com.funcoders.happy_pet_shop.constant.UserStatus;
import com.funcoders.happy_pet_shop.dto.request.UserRegisterRequest;
import com.funcoders.happy_pet_shop.dto.response.UserResponse;
import com.funcoders.happy_pet_shop.entity.User;
import com.funcoders.happy_pet_shop.exception.AppException;
import com.funcoders.happy_pet_shop.exception.ErrorType;
import com.funcoders.happy_pet_shop.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.Authentication;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponse register(UserRegisterRequest req) {
        String username = req.getUsername().trim();
        if (userRepository.existsByUsername(username)) {
            throw new AppException(ErrorType.USERNAME_ALREADY_EXISTS);
        }

        User user = User.builder()
                .username(username)
                .passwordHash(passwordEncoder.encode(req.getPassword()))
                .phone(req.getPhone())
                .address(req.getAddress())
                .role(UserRole.CUSTOMER)
                .status(UserStatus.ACTIVE)
                .build();

        User saved = userRepository.save(user);

        return UserResponse.builder()
                .id(saved.getId())
                .username(saved.getUsername())
                .phone(saved.getPhone())
                .address(saved.getAddress())
                .role(saved.getRole())
                .status(saved.getStatus())
                .createdAt(saved.getCreatedAt() == null ? null : saved.getCreatedAt().toInstant())
                .build();
    }

    @Transactional(readOnly = true)
    public UserResponse getMe(String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorType.USER_NOT_FOUND));

        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .phone(user.getPhone())
                .address(user.getAddress())
                .role(user.getRole())
                .status(user.getStatus())
                .createdAt(user.getCreatedAt() == null ? null : user.getCreatedAt().toInstant())
                .build();
    }
}

