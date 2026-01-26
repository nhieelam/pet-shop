package com.funcoders.happy_pet_shop.mapper;

import com.funcoders.happy_pet_shop.dto.response.InvoiceDetailResponse;
import com.funcoders.happy_pet_shop.entity.InvoiceDetail;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = InventoryMapper.class)
public interface InvoiceDetailMapper {
    InvoiceDetailResponse toResponse(InvoiceDetail invoiceDetail);
}
