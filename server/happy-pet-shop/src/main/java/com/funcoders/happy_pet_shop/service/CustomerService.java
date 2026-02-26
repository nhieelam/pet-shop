package com.funcoders.happy_pet_shop.service;

import com.funcoders.happy_pet_shop.constant.UserRole;
import com.funcoders.happy_pet_shop.dto.request.UserCreationRequest;
import com.funcoders.happy_pet_shop.dto.response.CustomerResponse;
import com.funcoders.happy_pet_shop.entity.Cart;
import com.funcoders.happy_pet_shop.entity.Customer;
import com.funcoders.happy_pet_shop.entity.Role;
import com.funcoders.happy_pet_shop.entity.User;
import com.funcoders.happy_pet_shop.exception.AppException;
import com.funcoders.happy_pet_shop.exception.ErrorType;
import com.funcoders.happy_pet_shop.mapper.CustomerMapper;
import com.funcoders.happy_pet_shop.mapper.UserMapper;
import com.funcoders.happy_pet_shop.repository.CustomerRepository;
import com.funcoders.happy_pet_shop.repository.RoleRepository;
import com.funcoders.happy_pet_shop.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerService {
    CustomerRepository customerRepository;
    CustomerMapper customerMapper;
    UserMapper userMapper;
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    RoleRepository roleRepository;

    @Transactional
    public CustomerResponse createCustomer(UserCreationRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorType.USERNAME_ALREADY_EXISTS);
        }

        Role userRole = roleRepository.findById(UserRole.USER_ROLE)
                .orElseThrow(() -> new AppException(ErrorType.NOT_FOUND));

        User userEntity = userMapper.toEntity(request);
        userEntity.setUsername(request.getUsername());             
        userEntity.setPhone(request.getPhone());                 
        userEntity.setPassword(passwordEncoder.encode(request.getPassword()));
        userEntity.setRoles(Set.of(userRole));

        User savedUser = userRepository.save(userEntity);

        Customer customer = Customer.builder()
                .user(savedUser)
                .points(BigDecimal.ZERO)
                .build();

        Customer savedCustomer = customerRepository.save(customer);

        Cart cart = new Cart();
        cart.setCustomer(savedCustomer);
        cartRepository.save(cart);

        savedCustomer.setCart(cart);

        return customerMapper.toResponse(savedCustomer);
    }

    @Transactional(readOnly = true)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<CustomerResponse> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();

        return customers.stream().map(customerMapper::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public CustomerResponse getCustomerById(UUID id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorType.NOT_FOUND));

        return customerMapper.toResponse(customer);
    }

    @Transactional
    public void deleteCustomer(UUID id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorType.NOT_FOUND));

        customerRepository.delete(customer);
    }

    @Transactional(readOnly = true)
    public CustomerResponse getInfo() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Customer customer = customerRepository.findByUser_Username(username)
                .orElseThrow(() -> new AppException(ErrorType.USER_NOT_FOUND));

        return customerMapper.toResponse(customer);
    }

    @Transactional
    public CustomerResponse addPoints(UUID customerId, BigDecimal points) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new AppException(ErrorType.NOT_FOUND));

        customer.setPoints(customer.getPoints().add(points));

        return customerMapper.toResponse(customer);
    }
}
