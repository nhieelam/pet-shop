package com.funcoders.happy_pet_shop.repository;

import com.funcoders.happy_pet_shop.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
}
