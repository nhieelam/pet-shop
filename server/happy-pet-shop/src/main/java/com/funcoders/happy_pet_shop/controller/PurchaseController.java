package com.funcoders.happy_pet_shop.controller;

import com.funcoders.happy_pet_shop.dto.request.PurchaseCreationRequest;
import com.funcoders.happy_pet_shop.dto.response.ApiResponse;
import com.funcoders.happy_pet_shop.dto.response.PurchaseResponse;
import com.funcoders.happy_pet_shop.service.PurchaseService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/purchases")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PurchaseController {

    PurchaseService purchaseService;

    @PostMapping
    public ApiResponse<PurchaseResponse> createPurchase(@Valid @RequestBody PurchaseCreationRequest request) {
        PurchaseResponse response = purchaseService.createPurchase(request);
        return new ApiResponse<PurchaseResponse>(response, "create purchase successfully");
    }

    @GetMapping("/{id}")
    public ApiResponse<PurchaseResponse> getPurchaseById(@PathVariable UUID id) {
        PurchaseResponse response = purchaseService.getPurchaseById(id);
        return new ApiResponse<PurchaseResponse>(response, "get purchase successfully");
    }

    @GetMapping
    public ApiResponse<List<PurchaseResponse>> getAllPurchases() {
        List<PurchaseResponse> responses = purchaseService.getAllPurchase();
        return new ApiResponse<List<PurchaseResponse>>(responses, "get all purchases successfully");
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deletePurchase(@PathVariable UUID id) {
        purchaseService.deletePurchase(id);
        return new ApiResponse<>(null, "delete purchase successfully");
    }
}
