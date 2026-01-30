package com.funcoders.happy_pet_shop.service;

import com.funcoders.happy_pet_shop.constant.PromotionStatus;
import com.funcoders.happy_pet_shop.dto.request.InvoiceCreationRequest;
import com.funcoders.happy_pet_shop.dto.request.InvoiceDetailCreationRequest;
import com.funcoders.happy_pet_shop.dto.response.InvoiceResponse;
import com.funcoders.happy_pet_shop.entity.*;
import com.funcoders.happy_pet_shop.exception.AppException;
import com.funcoders.happy_pet_shop.exception.ErrorType;
import com.funcoders.happy_pet_shop.mapper.InvoiceMapper;
import com.funcoders.happy_pet_shop.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InvoiceService {
    InvoiceRepository invoiceRepository;
    InvoiceMapper invoiceMapper;

    CustomerRepository customerRepository;

    StaffRepository staffRepository;

    InventoryRepository inventoryRepository;

    PromotionRepository promotionRepository;

    @Transactional
    public InvoiceResponse createInvoice(InvoiceCreationRequest request) {
        // find customer
        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new AppException(ErrorType.USER_NOT_FOUND));

        // find staff
        Staff staff = staffRepository.findById(request.getStaffId())
                .orElseThrow(() -> new AppException(ErrorType.USER_NOT_FOUND));

        Set<InvoiceDetail> invoiceDetailEntities = new HashSet<>();

        // create invoice with customer and staff
        Invoice invoiceEntity = Invoice.builder()
                .paymentMethod(request.getPaymentMethod())
                .customer(customer)
                .staff(staff)
                .invoiceDetails(invoiceDetailEntities)
                .shippingAddress(request.getShippingAddress())
                .build();

        // find and check inventories
        List<InvoiceDetailCreationRequest> invoiceDetailRequests = request.getInvoiceDetails();
        List<Inventory> inventories = inventoryRepository
                .findAllById(invoiceDetailRequests.stream()
                        .map(InvoiceDetailCreationRequest::getInventoryId)
                        .toList());

        System.out.println(inventories.size());
        System.out.println(invoiceDetailRequests.size());

        if (inventories.size() != invoiceDetailRequests.size())
            throw new AppException(ErrorType.INSUFFICIENT_INVENTORY);

        // create a Map of inventories with information
        Map<UUID, InvoiceDetailCreationRequest> invoiceDetailRequestMap = new HashMap<>();
        invoiceDetailRequests.forEach(invoiceDetailRequest -> {
            invoiceDetailRequestMap.put(invoiceDetailRequest.getInventoryId(), invoiceDetailRequest);
        });

        // loop inventories
        inventories.forEach(inventory -> {
            InvoiceDetailCreationRequest invoiceDetailRequest = invoiceDetailRequestMap.get(inventory.getId());

            if (invoiceDetailRequest.getQuantity() > inventory.getQuantity())
                throw new AppException(ErrorType.INSUFFICIENT_INVENTORY);

            InvoiceDetail invoiceDetail = InvoiceDetail.builder()
                    .unitPrice(inventory.getPrice())
                    .quantity(invoiceDetailRequest.getQuantity())
                    .inventory(inventory)
                    .invoice(invoiceEntity)
                    .build();
            invoiceDetail.reCalculateTotalPrice();

            invoiceDetailEntities.add(invoiceDetail);

            int quantity = invoiceDetail.getQuantity();
            inventory.setQuantity(inventory.getQuantity() - quantity);
            inventory.getProduct().setQuantity(
                    inventory.getProduct().getQuantity() - invoiceDetailRequest.getQuantity()
            );
        });

        invoiceEntity.recalculateTotalAmount();

        // apply promotion if exists
        if (request.getPromotionId() != null) {

            Promotion promotion = promotionRepository.findById(request.getPromotionId())
                    .orElseThrow(() -> new AppException(ErrorType.PROMOTION_NOT_FOUND));

            // check promotion active
            LocalDate now = LocalDate.now();

            if (!promotion.getStatus().equals(PromotionStatus.ACTIVE)) {
                throw new AppException(ErrorType.PROMOTION_INACTIVE);
            }

            if (now.isBefore(promotion.getStartDate())) {
                throw new AppException(ErrorType.PROMOTION_NOT_STARTED);
            }

            if (now.isAfter(promotion.getEndDate())) {
                promotion.setStatus(PromotionStatus.EXPIRED);
                throw new AppException(ErrorType.PROMOTION_EXPIRED);
            }

            BigDecimal discountAmount = BigDecimal.ZERO;

            switch (promotion.getDiscountType()) {
                case PERCENT -> {
                    discountAmount = invoiceEntity.getTotalAmount()
                            .multiply(promotion.getDiscountValue())
                            .divide(BigDecimal.valueOf(100));
                }
                case FIXED -> {
                    discountAmount = promotion.getDiscountValue();
                }
            }

            // prevent negative amount
            BigDecimal realAmount = invoiceEntity.getTotalAmount().subtract(discountAmount);
            if (realAmount.compareTo(BigDecimal.ZERO) < 0) {
                realAmount = BigDecimal.ZERO;
            }

            invoiceEntity.setRealAmount(realAmount);
            invoiceEntity.setPromotion(promotion);
        }

        return invoiceMapper.toResponse(invoiceRepository.save(invoiceEntity));
    }

    @Transactional(readOnly = true)
    public List<InvoiceResponse> getAllInvoices() {
        return invoiceRepository.findAll().stream().map(
                invoiceMapper::toResponse
        ).toList();
    }

    @Transactional(readOnly = true)
    public InvoiceResponse getInvoiceById(UUID id) {
        return invoiceMapper.toResponse(invoiceRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorType.INVOICE_NOT_FOUND)));
    }

    @Transactional()
    public void deleteInvoiceById(UUID id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorType.INVOICE_NOT_FOUND));

        invoiceRepository.delete(invoice);
    }
}
