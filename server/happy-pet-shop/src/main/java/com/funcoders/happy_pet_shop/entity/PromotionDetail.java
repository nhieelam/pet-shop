package com.funcoders.happy_pet_shop.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "promotion_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromotionDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "promotion_id", nullable = false)
    private Promotion promotion;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @Column(nullable = false)
    private BigDecimal discountPercentage;

    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}