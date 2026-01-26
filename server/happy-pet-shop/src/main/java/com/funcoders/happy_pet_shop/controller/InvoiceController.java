package com.funcoders.happy_pet_shop.controller;

import com.funcoders.happy_pet_shop.dto.request.InvoiceCreationRequest;
import com.funcoders.happy_pet_shop.dto.response.ApiResponse;
import com.funcoders.happy_pet_shop.dto.response.InvoiceResponse;
import com.funcoders.happy_pet_shop.service.InvoiceService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/invoices")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InvoiceController {

    InvoiceService invoiceService;

    @PostMapping
    public ApiResponse<InvoiceResponse> createInvoice(
            @Valid @RequestBody InvoiceCreationRequest request
    ) {
        InvoiceResponse response = invoiceService.createInvoice(request);
        return new ApiResponse<>(response, "create invoice successfully");
    }

    @GetMapping("/{id}")
    public ApiResponse<InvoiceResponse> getInvoiceById(
            @PathVariable UUID id
    ) {
        InvoiceResponse response = invoiceService.getInvoiceById(id);
        return new ApiResponse<>(response, "get invoice successfully");
    }

    @GetMapping
    public ApiResponse<List<InvoiceResponse>> getAllInvoices() {
        List<InvoiceResponse> responses = invoiceService.getAllInvoices();
        return new ApiResponse<>(responses, "get all invoices successfully");
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteInvoice(
            @PathVariable UUID id
    ) {
        invoiceService.deleteInvoiceById(id);
        return new ApiResponse<>(null, "delete invoice successfully");
    }
}
