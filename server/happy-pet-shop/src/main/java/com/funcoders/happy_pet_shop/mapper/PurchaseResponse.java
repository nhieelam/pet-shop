package com.funcoders.happy_pet_shop.mapper;

import com.funcoders.happy_pet_shop.constant.PaymentStatus;
import com.funcoders.happy_pet_shop.dto.response.PurchaseDetailResponse;
import com.funcoders.happy_pet_shop.dto.response.StaffResponse;
import com.funcoders.happy_pet_shop.dto.response.SupplierResponse;
import com.funcoders.happy_pet_shop.entity.PurchaseDetail;
import com.funcoders.happy_pet_shop.entity.Staff;
import com.funcoders.happy_pet_shop.entity.Supplier;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

public class PurchaseResponse {
    UUID id;

    StaffResponse staff;

    SupplierResponse supplier;

    BigDecimal totalAmount;

    PaymentStatus status;

    Set<PurchaseDetailResponse> purchaseDetails;

    LocalDateTime createdAt;
}
