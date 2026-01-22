package com.funcoders.happy_pet_shop.service;

import com.funcoders.happy_pet_shop.dto.request.StaffCreationRequest;
import com.funcoders.happy_pet_shop.dto.request.UserCreationRequest;
import com.funcoders.happy_pet_shop.dto.response.StaffResponse;
import com.funcoders.happy_pet_shop.entity.Staff;
import com.funcoders.happy_pet_shop.entity.User;
import com.funcoders.happy_pet_shop.exception.AppException;
import com.funcoders.happy_pet_shop.exception.ErrorType;
import com.funcoders.happy_pet_shop.mapper.StaffMapper;
import com.funcoders.happy_pet_shop.mapper.UserMapper;
import com.funcoders.happy_pet_shop.repository.StaffRepository;
import com.funcoders.happy_pet_shop.repository.UserRepository;
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
public class StaffService {

    UserMapper userMapper;
    UserRepository userRepository;

    StaffMapper staffMapper;
    StaffRepository staffRepository;

    @Transactional
    public StaffResponse createStaff(StaffCreationRequest request) {

        UserCreationRequest userCreationRequest = request.getUserCreationRequest();

        User userEntity = userMapper.toEntity(userCreationRequest);
        User managedUser = userRepository.save(userEntity);

        Staff staff = Staff.builder()
                .user(managedUser)
                .shift(request.getShift())
                .build();

        return staffMapper.toResponse(staffRepository.save(staff));
    }

    @Transactional(readOnly = true)
    public StaffResponse getStaffById(UUID staffId) {
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new AppException(ErrorType.NOT_FOUND));

        return staffMapper.toResponse(staff);
    }

    @Transactional(readOnly = true)
    public List<StaffResponse> getAllStaff() {
        return staffRepository.findAll()
                .stream()
                .map(staffMapper::toResponse)
                .toList();
    }

    @Transactional
    public StaffResponse updateStaffShift(UUID staffId, int shift) {

        if (shift < 1 || shift > 3) {
            throw new AppException(ErrorType.BAD_REQUEST);
        }

        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new AppException(ErrorType.NOT_FOUND));

        staff.setShift(shift);

        return staffMapper.toResponse(staffRepository.save(staff));
    }


    @Transactional
    public void deleteStaff(UUID staffId) {

        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new AppException(ErrorType.NOT_FOUND));

        staffRepository.delete(staff);
    }
}

