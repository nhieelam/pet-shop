package com.funcoders.happy_pet_shop.service;

import com.funcoders.happy_pet_shop.constant.PromotionStatus;
import com.funcoders.happy_pet_shop.dto.request.PromotionCreationRequest;
import com.funcoders.happy_pet_shop.dto.response.PromotionResponse;
import com.funcoders.happy_pet_shop.entity.Promotion;
import com.funcoders.happy_pet_shop.exception.AppException;
import com.funcoders.happy_pet_shop.exception.ErrorType;
import com.funcoders.happy_pet_shop.mapper.PromotionMapper;
import com.funcoders.happy_pet_shop.repository.PromotionRepository;
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
public class PromotionService {

    PromotionRepository promotionRepository;
    PromotionMapper promotionMapper;

    @Transactional
    public PromotionResponse createPromotion(PromotionCreationRequest request) {

        if (promotionRepository.existsByCode(request.getCode())) {
            throw new AppException(ErrorType.BAD_REQUEST);
        }

        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new AppException(ErrorType.BAD_REQUEST);
        }

        Promotion promotionEntity = promotionMapper.toEntity(request);

        if (promotionEntity.getStatus() == null) {
            promotionEntity.setStatus(PromotionStatus.ACTIVE);
        }

        Promotion savedPromotion = promotionRepository.save(promotionEntity);

        return promotionMapper.toResponse(savedPromotion);
    }

    @Transactional(readOnly = true)
    public PromotionResponse getPromotionById(UUID id) {
        Promotion promotion = promotionRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorType.NOT_FOUND));

        return promotionMapper.toResponse(promotion);
    }

    @Transactional(readOnly = true)
    public List<PromotionResponse> getAllPromotions() {
        return promotionRepository.findAll()
                .stream()
                .map(promotionMapper::toResponse)
                .toList();
    }

    @Transactional
    public void deletePromotion(UUID id) {
        if (!promotionRepository.existsById(id)) {
            throw new AppException(ErrorType.NOT_FOUND);
        }
        promotionRepository.deleteById(id);
    }
}

