package com.funcoders.happy_pet_shop.mapper;

import com.funcoders.happy_pet_shop.dto.response.CustomerResponse;
import com.funcoders.happy_pet_shop.entity.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {UserMapper.class, CartMapper.class})
public interface CustomerMapper {
    @Mapping(target = "invoices", ignore = true)
    CustomerResponse toResponse(Customer customer);
}
