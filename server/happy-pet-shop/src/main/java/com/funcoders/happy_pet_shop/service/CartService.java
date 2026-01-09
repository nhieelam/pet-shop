package com.funcoders.happy_pet_shop.service;

import com.funcoders.happy_pet_shop.dto.request.CartCreationRequest;
import com.funcoders.happy_pet_shop.dto.response.CartResponse;
import com.funcoders.happy_pet_shop.entity.Cart;
import com.funcoders.happy_pet_shop.entity.Customer;
import com.funcoders.happy_pet_shop.exception.AppException;
import com.funcoders.happy_pet_shop.exception.ErrorType;
import com.funcoders.happy_pet_shop.mapper.CartMapper;
import com.funcoders.happy_pet_shop.repository.CartRepository;
import com.funcoders.happy_pet_shop.repository.CustomerRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartService {
    CartRepository cartRepository;
    CustomerRepository customerRepository;
    CartMapper cartMapper;

    public CartResponse createCart(CartCreationRequest request) {
        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new AppException(ErrorType.USER_NOT_FOUND));

        // Check cart đã tồn tại chưa
        cartRepository.findByCustomer(customer)
                .ifPresent(cart -> {
                    throw new AppException(ErrorType.CART_ALREADY_EXISTS);
                });

        Cart cart = Cart.builder()
                .customer(customer)
                .build();

        return cartMapper.toResponse(cartRepository.save(cart));
    }

    public CartResponse getCartByCustomerId(UUID customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new AppException(ErrorType.USER_NOT_FOUND));

        Cart cart = cartRepository.findByCustomer(customer)
                .orElseThrow(() -> new AppException(ErrorType.CART_NOT_FOUND));

        return cartMapper.toResponse(cart);
    }

    public CartResponse getCartById(UUID cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new AppException(ErrorType.CART_NOT_FOUND));

        return cartMapper.toResponse(cart);
    }


    public CartResponse getOrCreateCart(UUID customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new AppException(ErrorType.USER_NOT_FOUND));

        Cart cart = cartRepository.findByCustomer(customer)
                .orElseGet(() -> cartRepository.save(
                        Cart.builder()
                                .customer(customer)
                                .build()
                ));

        return cartMapper.toResponse(cart);
    }

    public void deleteCart(UUID cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new AppException(ErrorType.CART_NOT_FOUND));

        cartRepository.delete(cart);
    }
}

