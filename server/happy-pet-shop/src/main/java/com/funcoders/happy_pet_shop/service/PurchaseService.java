package com.funcoders.happy_pet_shop.service;

import com.funcoders.happy_pet_shop.dto.request.PurchaseCreationRequest;
import com.funcoders.happy_pet_shop.dto.request.PurchaseDetailCreationRequest;
import com.funcoders.happy_pet_shop.entity.*;
import com.funcoders.happy_pet_shop.exception.AppException;
import com.funcoders.happy_pet_shop.exception.ErrorType;
import com.funcoders.happy_pet_shop.mapper.PurchaseDetailMapper;
import com.funcoders.happy_pet_shop.mapper.PurchaseMapper;
import com.funcoders.happy_pet_shop.dto.response.PurchaseResponse;
import com.funcoders.happy_pet_shop.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.support.ManagedProperties;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PurchaseService {
    PurchaseRepository purchaseRepository;
    PurchaseMapper purchaseMapper;
    PurchaseDetailRepository purchaseDetailRepository;

    PurchaseDetailMapper purchaseDetailMapper;

    StaffRepository staffRepository;

    SupplierRepository supplierRepository;


    ProductRepository productRepository;

    @Transactional
    public PurchaseResponse createPurchase(PurchaseCreationRequest request) {
        List<PurchaseDetailCreationRequest> purchaseDetailRequests = request.getPurchaseDetails();

        Set<PurchaseDetail> purchaseDetails = new HashSet<>();

        // find staff
        Staff staff = staffRepository.findById(request.getStaffId())
                .orElseThrow(() -> new AppException(ErrorType.USER_NOT_FOUND));

        // find supplier
        Supplier supplier = supplierRepository.findById(request.getSupplierId())
                .orElseThrow(() -> new AppException(ErrorType.NOT_FOUND));

        // create purchase entity with staff and supplier
        Purchase purchaseEntity = Purchase.builder()
                .staff(staff)
                .supplier(supplier)
                .purchaseDetails(purchaseDetails)
                .build();

        // find products
        List<Product> products = productRepository.findAllById(purchaseDetailRequests.stream().map(
                PurchaseDetailCreationRequest::getProductId
        ).toList());
        //check products
        if (products.size() != purchaseDetailRequests.size())
            throw new AppException(ErrorType.BAD_REQUEST);

        // create a Map to search purchase detail
        Map<UUID, PurchaseDetailCreationRequest> purchaseDetailRequestMap = new HashMap<>();
        purchaseDetailRequests.forEach(
                purchaseDetailCreationRequest -> {
                    purchaseDetailRequestMap.put(purchaseDetailCreationRequest.getProductId(), purchaseDetailCreationRequest);
                }
        );

        // loop through products to add purchase details into the purchase
        products.forEach(product -> {

            // create purchaseDetail with inventory above
            PurchaseDetail purchaseDetailEntity = PurchaseDetail.builder()
                    .purchase(purchaseEntity)
                    .unitPrice(purchaseDetailRequestMap.get(product.getId()).getUnitPrice())
                    .quantity(purchaseDetailRequestMap.get(product.getId()).getQuantity())
                    .build();
            purchaseDetailEntity.calculateTotalPrice();

            // update quantity of product
            product.setQuantity(product.getQuantity() + purchaseDetailEntity.getQuantity());

            // add purchaseDetail into the set of purchaseDetails
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
