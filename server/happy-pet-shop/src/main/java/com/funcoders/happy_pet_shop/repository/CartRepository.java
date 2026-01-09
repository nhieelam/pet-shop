package com.funcoders.happy_pet_shop.repository;

import com.funcoders.happy_pet_shop.entity.Cart;
import com.funcoders.happy_pet_shop.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CartRepository extends JpaRepository<Cart, UUID> {
    Optional<Cart> findByCustomer(Customer customer);
}
