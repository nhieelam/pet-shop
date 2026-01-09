package com.funcoders.happy_pet_shop.mapper;

import com.funcoders.happy_pet_shop.dto.response.CartResponse;
import com.funcoders.happy_pet_shop.dto.response.CustomerResponse;
import com.funcoders.happy_pet_shop.entity.Cart;
import com.funcoders.happy_pet_shop.entity.Customer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = UserMapper.class)
public interface CustomerMapper {
    CustomerResponse toResponse(Customer customer);
}
