package com.funcoders.happy_pet_shop.controller;

import com.funcoders.happy_pet_shop.dto.request.InventoryCreationRequest;
import com.funcoders.happy_pet_shop.dto.request.InventoryUpdateRequest;
import com.funcoders.happy_pet_shop.dto.response.ApiResponse;
import com.funcoders.happy_pet_shop.dto.response.InventoryResponse;
import com.funcoders.happy_pet_shop.service.InventoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/inventories")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InventoryController {

    InventoryService inventoryService;

    @PostMapping
    public ApiResponse<InventoryResponse> createInventory(
            @RequestBody InventoryCreationRequest request
    ) {
        InventoryResponse response = inventoryService.createInventory(request);
        return new ApiResponse<>(response, "Create inventory successfully");
    }

    @GetMapping
    public ApiResponse<List<InventoryResponse>> getAllInventory() {
        List<InventoryResponse> responses = inventoryService.getAllInventory();
        return new ApiResponse<>(responses, "Get all inventory successfully");
    }

    @GetMapping("/{id}")
    public ApiResponse<InventoryResponse> getInventoryById(
            @PathVariable UUID id
    ) {
        InventoryResponse response = inventoryService.getInventoryById(id);
        return new ApiResponse<>(response, "Get inventory successfully");
    }

    @PutMapping("/{id}")
    public ApiResponse<InventoryResponse> updateInventory(
            @PathVariable UUID id,
            @RequestBody InventoryUpdateRequest request
    ) {
        InventoryResponse response = inventoryService.updateInventory(id, request);
        return new ApiResponse<>(response, "Update inventory successfully");
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteInventory(
            @PathVariable UUID id
    ) {
        inventoryService.deleteInventory(id);
        return new ApiResponse<>(null, "Delete inventory successfully");
    }
}
