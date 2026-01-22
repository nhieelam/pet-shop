package com.funcoders.happy_pet_shop.mapper;

import com.funcoders.happy_pet_shop.dto.request.PurchaseDetailCreationRequest;
import com.funcoders.happy_pet_shop.dto.response.PurchaseDetailResponse;
import com.funcoders.happy_pet_shop.entity.PurchaseDetail;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PurchaseDetailMapper {
    PurchaseDetailResponse toResponse(PurchaseDetail purchaseDetail);
    PurchaseDetail toEntity(PurchaseDetailCreationRequest request);
}
