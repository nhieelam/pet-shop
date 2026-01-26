package com.funcoders.happy_pet_shop.service;

import com.funcoders.happy_pet_shop.dto.request.PurchaseCreationRequest;
import com.funcoders.happy_pet_shop.dto.request.PurchaseDetailCreationRequest;
import com.funcoders.happy_pet_shop.entity.*;
import com.funcoders.happy_pet_shop.exception.AppException;
import com.funcoders.happy_pet_shop.exception.ErrorType;
import com.funcoders.happy_pet_shop.mapper.PurchaseDetailMapper;
import com.funcoders.happy_pet_shop.mapper.PurchaseMapper;
import com.funcoders.happy_pet_shop.mapper.PurchaseResponse;
import com.funcoders.happy_pet_shop.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PurchaseService {
    PurchaseRepository purchaseRepository;
    PurchaseMapper purchaseMapper;
    PurchaseDetailRepository purchaseDetailRepository;

    PurchaseDetailMapper purchaseDetailMapper;

    StaffRepository staffRepository;

    SupplierRepository supplierRepository;

    InventoryRepository inventoryRepository;

    ProductRepository productRepository;

    @Transactional
    public PurchaseResponse createPurchase(PurchaseCreationRequest request) {
        Set<PurchaseDetailCreationRequest> purchaseDetailCreationRequests = request.getPurchaseDetails();

        Set<PurchaseDetail> purchaseDetails = new HashSet<>();

//        STAFF
        Staff staff = staffRepository.findById(request.getStaffId())
                .orElseThrow(() -> new AppException(ErrorType.USER_NOT_FOUND));

//        SUPPLIER
        Supplier supplier = supplierRepository.findById(request.getSupplierId())
                .orElseThrow(() -> new AppException(ErrorType.NOT_FOUND));

//        PURCHASE ENTITY
        Purchase purchaseEntity = Purchase.builder()
                .staff(staff)
                .supplier(supplier)
                .purchaseDetails(purchaseDetails)
                .build();

//        PURCHASE DETAIL REQUESTS
        purchaseDetailCreationRequests.forEach(purchaseDetailRequest -> {
            Product product = productRepository.findById(purchaseDetailRequest.getProductId())
                    .orElseThrow(() -> new AppException(ErrorType.NOT_FOUND));

            Inventory inventory = Inventory.builder()
                    .product(product)
                    .quantity(purchaseDetailRequest.getQuantity())
                    .build();

            PurchaseDetail purchaseDetailEntity = PurchaseDetail.builder()
                    .inventory(inventory)
                    .purchase(purchaseEntity)
                    .unitPrice(purchaseDetailRequest.getUnitPrice())
                    .quantity(purchaseDetailRequest.getQuantity())
                    .build();

            product.setQuantity(product.getQuantity() + purchaseDetailRequest.getQuantity());
            purchaseDetails.add(purchaseDetailEntity);
        });

        purchaseEntity.recalculateTotalAmount();

        return purchaseMapper.toResponse(purchaseRepository.save(purchaseEntity));
    }

    @Transactional(readOnly = true)
    public List<PurchaseResponse> getAllPurchase() {
        List<Purchase> purchases = purchaseRepository.findAll();

        return purchases
                .stream()
                .map(purchaseMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public PurchaseResponse getPurchaseById(UUID id) {
        Purchase purchaseEntity = purchaseRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorType.PURCHASE_NOT_FOUND));

        return purchaseMapper.toResponse(purchaseEntity);
    }

    @Transactional
    public void deletePurchase(UUID id) {
        Purchase purchaseEntity = purchaseRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorType.PURCHASE_NOT_FOUND));

        purchaseRepository.delete(purchaseEntity);
    }
}
