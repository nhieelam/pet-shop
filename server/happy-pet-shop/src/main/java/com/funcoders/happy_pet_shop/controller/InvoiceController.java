package com.funcoders.happy_pet_shop.controller;

import com.funcoders.happy_pet_shop.dto.request.InvoiceCreationRequest;
import com.funcoders.happy_pet_shop.dto.request.ReviewRequest;
import com.funcoders.happy_pet_shop.dto.response.ApiResponse;
import com.funcoders.happy_pet_shop.dto.response.InvoiceResponse;
import com.funcoders.happy_pet_shop.dto.response.ReviewResponse;
import com.funcoders.happy_pet_shop.service.InvoiceService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/invoices")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InvoiceController {

    InvoiceService invoiceService;

    @PostMapping("/review")
    public ApiResponse<ReviewResponse> createReview(
            @Valid @RequestBody ReviewRequest request
    ) {
        ReviewResponse response = invoiceService.createReview(request);
        return new ApiResponse<>(response, "Review invoice successfully");
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<InvoiceResponse> createInvoice(
            @Valid @RequestBody InvoiceCreationRequest request
    ) {
        InvoiceResponse response = invoiceService.createInvoice(request);
        return new ApiResponse<>(response, "Create invoice successfully");
    }

    @GetMapping("/{id}")
    public ApiResponse<InvoiceResponse> getInvoiceById(
            @PathVariable UUID id
    ) {
        InvoiceResponse response = invoiceService.getInvoiceById(id);
        return new ApiResponse<>(response, "Get invoice successfully");
    }

    @GetMapping
    public ApiResponse<List<InvoiceResponse>> getAllInvoices() {
        List<InvoiceResponse> responses = invoiceService.getAllInvoices();
        return new ApiResponse<>(responses, "Get all invoices successfully");
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteInvoice(
            @PathVariable UUID id
    ) {
        invoiceService.deleteInvoiceById(id);
        return new ApiResponse<>(null, "Delete invoice successfully");
    }
}
