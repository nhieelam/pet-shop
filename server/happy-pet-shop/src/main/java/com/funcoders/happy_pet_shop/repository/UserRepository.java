package com.funcoders.happy_pet_shop.repository;

import com.funcoders.happy_pet_shop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUserName(String name);
    boolean existsByUserName(String s);
}
