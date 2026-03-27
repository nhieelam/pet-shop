package com.funcoders.happy_pet_shop.mapper;

import com.funcoders.happy_pet_shop.dto.response.CartItemResponse;
import com.funcoders.happy_pet_shop.entity.CartItem;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ProductMapper.class, PetMapper.class})
public interface CartItemMapper {
    CartItemResponse toResponse(CartItem cartItem);
}
