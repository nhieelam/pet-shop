package com.funcoders.happy_pet_shop.service;

import com.funcoders.happy_pet_shop.dto.request.InvoiceCreationRequest;
import com.funcoders.happy_pet_shop.dto.request.InvoiceDetailCreationRequest;
import com.funcoders.happy_pet_shop.dto.response.InvoiceResponse;
import com.funcoders.happy_pet_shop.entity.*;
import com.funcoders.happy_pet_shop.exception.AppException;
import com.funcoders.happy_pet_shop.exception.ErrorType;
import com.funcoders.happy_pet_shop.mapper.InvoiceMapper;
import com.funcoders.happy_pet_shop.repository.CustomerRepository;
import com.funcoders.happy_pet_shop.repository.InventoryRepository;
import com.funcoders.happy_pet_shop.repository.InvoiceRepository;
import com.funcoders.happy_pet_shop.repository.StaffRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;
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

    @Transactional
    public InvoiceResponse createInvoice(InvoiceCreationRequest request) {
        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new AppException(ErrorType.USER_NOT_FOUND));

        Staff staff = staffRepository.findById(request.getStaffId())
                .orElseThrow(() -> new AppException(ErrorType.USER_NOT_FOUND));

        Invoice invoiceEntity = Invoice.builder()
                .paymentMethod(request.getPaymentMethod())
                .customer(customer)
                .staff(staff)
                .build();

        Set<InvoiceDetailCreationRequest> invoiceDetailRequests = request.getInvoiceDetails();
        Set<InvoiceDetail> invoiceEntityDetails = invoiceDetailRequests.stream().map(
                invoiceDetailRequest -> {
                    Inventory managedInventory = inventoryRepository.findById(invoiceDetailRequest.getInventoryId())
                            .orElseThrow(() -> new AppException(ErrorType.NOT_FOUND));

                    if (invoiceDetailRequest.getQuantity() > managedInventory.getQuantity()) {
                        throw new AppException(ErrorType.INSUFFICIENT_INVENTORY);
                    }

                    managedInventory.setQuantity(
                            managedInventory.getQuantity() - invoiceDetailRequest.getQuantity()
                    );

                    InvoiceDetail invoiceDetail = InvoiceDetail.builder()
                            .quantity(invoiceDetailRequest.getQuantity())
                            .inventory(managedInventory)
                            .invoice(invoiceEntity)
                            .build();

                    return invoiceDetail;
                }
        ).collect(Collectors.toSet());

        invoiceEntity.setInvoiceDetails(invoiceEntityDetails);

        invoiceEntity.recalculateTotalAmount();

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
