package com.funcoders.happy_pet_shop.mapper;

import com.funcoders.happy_pet_shop.entity.Purchase;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = PurchaseDetailMapper.class)
public interface PurchaseMapper {
    PurchaseResponse toResponse(Purchase purchase);
}
