package com.funcoders.happy_pet_shop.repository;

import com.funcoders.happy_pet_shop.entity.CartItem;
import com.funcoders.happy_pet_shop.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface InventoryRepository extends JpaRepository<Inventory, UUID> {
}
