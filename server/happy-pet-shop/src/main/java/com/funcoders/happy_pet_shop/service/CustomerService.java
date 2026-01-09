package com.funcoders.happy_pet_shop.service;

import com.funcoders.happy_pet_shop.dto.request.CustomerCreationRequest;
import com.funcoders.happy_pet_shop.dto.response.CustomerResponse;
import com.funcoders.happy_pet_shop.entity.Cart;
import com.funcoders.happy_pet_shop.entity.Customer;
import com.funcoders.happy_pet_shop.entity.User;
import com.funcoders.happy_pet_shop.mapper.CustomerMapper;
import com.funcoders.happy_pet_shop.mapper.UserMapper;
import com.funcoders.happy_pet_shop.repository.CartRepository;
import com.funcoders.happy_pet_shop.repository.CustomerRepository;
import com.funcoders.happy_pet_shop.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerService {
    CustomerRepository customerRepository;
    CustomerMapper customerMapper;
    UserRepository userRepository;
    UserMapper userMapper;
    CartRepository cartRepository;

    @Transactional
    public CustomerResponse createCustomer(CustomerCreationRequest request) {
        User userEntity = userMapper.toUserEntity(request.getUserCreationRequest());

        User managedUserEntity = userRepository.save(userEntity);

        Cart cart = new Cart();

        Customer customer = Customer.builder()
                .user(managedUserEntity)
                .cart(cart)
                .points(BigDecimal.ZERO)
                .build();

        cart.setCustomer(customer);

        return customerMapper.toResponse(
                customerRepository.save(customer)
        );
    }
}
