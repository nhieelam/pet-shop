package com.funcoders.happy_pet_shop.mapper;

import com.funcoders.happy_pet_shop.dto.request.InventoryCreationRequest;
import com.funcoders.happy_pet_shop.dto.request.InventoryUpdateRequest;
import com.funcoders.happy_pet_shop.dto.response.InventoryResponse;
import com.funcoders.happy_pet_shop.entity.Inventory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface InventoryMapper {
    @Mapping(target = "product", ignore = true)
    @Mapping(target = "price", ignore = true)
    Inventory toEntity(InventoryCreationRequest request);

    InventoryResponse toResponse(Inventory inventory);

    void updateInventory(@MappingTarget Inventory inventory, InventoryUpdateRequest request);
}
