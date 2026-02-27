package com.funcoders.happy_pet_shop.repository;

import com.funcoders.happy_pet_shop.entity.RefreshToken;
import com.funcoders.happy_pet_shop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    Optional<RefreshToken> findByToken(String token);

    boolean existsByToken(String token);

    boolean existsByUserIdAndRevokedFalse(UUID userId);

    List<RefreshToken> findByUserIdAndRevokedFalse(UUID userId);
}