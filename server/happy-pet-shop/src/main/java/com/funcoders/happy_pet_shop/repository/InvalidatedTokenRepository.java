package com.funcoders.happy_pet_shop.repository;

import com.funcoders.happy_pet_shop.entity.InvalidatedToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvalidatedTokenRepository extends JpaRepository<InvalidatedToken, String> {
}
