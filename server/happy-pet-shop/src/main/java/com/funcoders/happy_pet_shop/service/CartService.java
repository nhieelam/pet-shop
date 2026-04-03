package com.funcoders.happy_pet_shop.service;

import com.funcoders.happy_pet_shop.dto.request.CartRequest;
import com.funcoders.happy_pet_shop.dto.response.CartResponse;
import com.funcoders.happy_pet_shop.entity.Cart;
import com.funcoders.happy_pet_shop.entity.CartItem;
import com.funcoders.happy_pet_shop.entity.Customer;
import com.funcoders.happy_pet_shop.entity.Pet;
import com.funcoders.happy_pet_shop.entity.Product;
import com.funcoders.happy_pet_shop.exception.AppException;
import com.funcoders.happy_pet_shop.exception.ErrorType;
import com.funcoders.happy_pet_shop.mapper.CartMapper;
import com.funcoders.happy_pet_shop.repository.CartItemRepository;
import com.funcoders.happy_pet_shop.repository.CartRepository;
import com.funcoders.happy_pet_shop.repository.CustomerRepository;
import com.funcoders.happy_pet_shop.repository.PetRepository;
import com.funcoders.happy_pet_shop.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartService {
    CustomerRepository customerRepository;

    ProductRepository productRepository;
    PetRepository petRepository;

    CartRepository cartRepository;
    CartItemRepository cartItemRepository;
    CartMapper cartMapper;

    @Transactional
    public CartResponse deleteCartItem(UUID customerId, UUID cartItemId) {
        Cart cart = cartRepository.findByCustomer_Id(customerId)
                .orElseThrow(() -> new AppException(ErrorType.CART_NOT_FOUND));

        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new AppException(ErrorType.NOT_FOUND));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new AppException(ErrorType.NOT_FOUND);
        }

        cart.getCartItems().remove(item);
        return cartMapper.toResponse(cartRepository.save(cart));
    }

    @Transactional
    public CartResponse addProduct(UUID customerId, CartRequest request) {
        Cart cart = cartRepository.findByCustomer_Id(customerId)
                .orElseThrow(() -> new AppException(ErrorType.CART_NOT_FOUND));

        if (request.getProductId() != null) {
            return addProductLine(cart, request.getProductId(), request.getQuantity());
        }
        return addPetLine(cart, request.getPetId(), request.getQuantity());
    }

    private CartResponse addProductLine(Cart cart, UUID productId, int quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new AppException(ErrorType.PRODUCT_NOT_FOUND));

        CartItem existingItem = findCartItemByProduct(cart, productId);

        if (quantity == 0) {
            if (existingItem != null) {
                cart.getCartItems().remove(existingItem);
            }
            return cartMapper.toResponse(cartRepository.save(cart));
        }

        if (existingItem != null) {
            existingItem.setQuantity(quantity);
        } else {
            CartItem cartItem = CartItem.builder()
                    .product(product)
                    .pet(null)
                    .quantity(quantity)
                    .cart(cart)
                    .build();
            cart.getCartItems().add(cartItem);
        }

        return cartMapper.toResponse(cartRepository.save(cart));
    }

    private CartResponse addPetLine(Cart cart, UUID petId, int quantity) {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new AppException(ErrorType.PET_NOT_FOUND));

        if (!Boolean.TRUE.equals(pet.getAvailable()) || Boolean.TRUE.equals(pet.getSold())) {
            throw new AppException(ErrorType.PET_ALREADY_SOLD);
        }

        if (quantity > 1) {
            throw new AppException(ErrorType.INVALID_PRODUCT_QUANTITY);
        }

        CartItem existingItem = findCartItemByPet(cart, petId);

        if (quantity == 0) {
            if (existingItem != null) {
                cart.getCartItems().remove(existingItem);
            }
            return cartMapper.toResponse(cartRepository.save(cart));
        }

        if (existingItem != null) {
            existingItem.setQuantity(1);
        } else {
            CartItem cartItem = CartItem.builder()
                    .product(null)
                    .pet(pet)
                    .quantity(1)
                    .cart(cart)
                    .build();
            cart.getCartItems().add(cartItem);
        }

        return cartMapper.toResponse(cartRepository.save(cart));
    }

    private static CartItem findCartItemByProduct(Cart cart, UUID productId) {
        Set<CartItem> items = cart.getCartItems();
        if (items == null) {
            return null;
        }
        for (CartItem item : items) {
            if (item.getProduct() != null && item.getProduct().getId().equals(productId)) {
                return item;
            }
        }
        return null;
    }

    private static CartItem findCartItemByPet(Cart cart, UUID petId) {
        Set<CartItem> items = cart.getCartItems();
        if (items == null) {
            return null;
        }
        for (CartItem item : items) {
            if (item.getPet() != null && item.getPet().getId().equals(petId)) {
                return item;
            }
        }
        return null;
    }
}
