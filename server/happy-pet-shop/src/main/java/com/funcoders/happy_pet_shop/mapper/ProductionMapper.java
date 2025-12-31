package com.funcoders.happy_pet_shop.mapper;

import com.funcoders.happy_pet_shop.dto.request.ProductCreationRequest;
import com.funcoders.happy_pet_shop.dto.request.ProductUpdateRequest;
import com.funcoders.happy_pet_shop.dto.response.ProductResponse;
import com.funcoders.happy_pet_shop.entity.ProductEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductionMapper {
    ProductEntity toProductEntity(ProductCreationRequest request);

    void updateProduct(@MappingTarget ProductEntity productEntity, ProductUpdateRequest request);

    ProductResponse toResponse(ProductEntity productEntity);
}
