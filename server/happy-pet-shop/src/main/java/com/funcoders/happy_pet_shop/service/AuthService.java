package com.funcoders.happy_pet_shop.service;

import com.funcoders.happy_pet_shop.entity.RefreshToken;
import com.funcoders.happy_pet_shop.exception.ErrorType;
import com.funcoders.happy_pet_shop.constant.UserStatus;
import com.funcoders.happy_pet_shop.dto.request.LoginRequest;
import com.funcoders.happy_pet_shop.dto.response.LoginResponse;
import com.funcoders.happy_pet_shop.dto.response.UserResponse;
import com.funcoders.happy_pet_shop.entity.User;
import com.funcoders.happy_pet_shop.exception.AppException;
import com.funcoders.happy_pet_shop.repository.RefreshTokenRepository;
import com.funcoders.happy_pet_shop.repository.UserRepository;
import com.funcoders.happy_pet_shop.service.JwtService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthService {

    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    JwtService jwtService;

    RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public void logout(String token) {
        RefreshToken refreshToken =
                refreshTokenRepository.findByToken(token)
                        .orElseThrow(() -> new AppException(ErrorType.TOKEN_NOT_FOUND));

        refreshToken.setRevoked(true);
    }

    public LoginResponse login(LoginRequest req) {
        String username = req.getUsername().trim();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorType.INVALID_CREDENTIAL));

        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new AppException(ErrorType.INVALID_CREDENTIAL);
        }
        String accessToken = jwtService.generateAccessToken(user);

        return LoginResponse.builder()
                .accessToken(accessToken)
                .tokenType("Bearer")
                .expiresIn(jwtService.getAccessTokenExpiresInSeconds())
                .build();
    }
}