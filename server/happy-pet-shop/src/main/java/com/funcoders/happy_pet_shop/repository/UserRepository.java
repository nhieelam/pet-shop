package com.funcoders.happy_pet_shop.repository;

import com.funcoders.happy_pet_shop.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
    Optional<UserEntity> findByUserName(String name);
    boolean existsByUserName(String s);
}
