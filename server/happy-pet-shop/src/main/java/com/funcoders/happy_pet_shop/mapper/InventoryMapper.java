package com.funcoders.happy_pet_shop.mapper;

import com.funcoders.happy_pet_shop.dto.response.CartItemResponse;
import com.funcoders.happy_pet_shop.dto.response.InventoryResponse;
import com.funcoders.happy_pet_shop.entity.CartItem;
import com.funcoders.happy_pet_shop.entity.Inventory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InventoryMapper {
    InventoryResponse toResponse(Inventory inventory);
}
