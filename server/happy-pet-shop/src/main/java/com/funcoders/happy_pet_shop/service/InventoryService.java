package com.funcoders.happy_pet_shop.service;

import com.funcoders.happy_pet_shop.dto.request.InventoryCreationRequest;
import com.funcoders.happy_pet_shop.dto.request.InventoryUpdateRequest;
import com.funcoders.happy_pet_shop.dto.response.InventoryResponse;
import com.funcoders.happy_pet_shop.entity.Inventory;
import com.funcoders.happy_pet_shop.entity.Product;
import com.funcoders.happy_pet_shop.exception.AppException;
import com.funcoders.happy_pet_shop.exception.ErrorType;
import com.funcoders.happy_pet_shop.mapper.InventoryMapper;
import com.funcoders.happy_pet_shop.repository.InventoryRepository;
import com.funcoders.happy_pet_shop.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InventoryService {

    InventoryRepository inventoryRepository;
    InventoryMapper inventoryMapper;

    ProductRepository productRepository;

    @Transactional
    public InventoryResponse createInventory(InventoryCreationRequest request) {
        Inventory inventoryEntity = inventoryMapper.toEntity(request);

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new AppException(ErrorType.NOT_FOUND));

        inventoryEntity.setProduct(product);
        inventoryEntity.setPrice(product.getPrice());

        product.setQuantity(product.getQuantity() + inventoryEntity.getQuantity());

        return inventoryMapper
                .toResponse(inventoryRepository
                        .save(inventoryEntity));
    }

    @Transactional(readOnly = true)
    public List<InventoryResponse> getAllInventory() {
        return inventoryRepository.findAll()
                .stream()
                .map(inventoryMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public InventoryResponse getInventoryById(UUID id) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorType.NOT_FOUND));

        return inventoryMapper.toResponse(inventory);
    }

    @Transactional
    public InventoryResponse updateInventory(UUID id, InventoryUpdateRequest request) {

        Inventory managedInventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorType.NOT_FOUND));

        inventoryMapper.updateInventory(managedInventory, request);

        return inventoryMapper.toResponse(managedInventory);
    }

    @Transactional
    public void deleteInventory(UUID id) {

        Inventory managedInventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorType.NOT_FOUND));

        inventoryRepository.delete(managedInventory);
    }
}
