package com.funcoders.happy_pet_shop.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "purchase_details",
        indexes = {
                @Index(name = "idx_purchase_detail_purchase", columnList = "purchase_id"),
                @Index(name = "idx_purchase_detail_product", columnList = "product_id")
        },
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_purchase_product",
                        columnNames = {"purchase_id", "product_id"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PurchaseDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "purchase_id", nullable = false)
    Purchase purchase;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    Inventory inventory;

    @Column(nullable = false, precision = 15, scale = 2)
    BigDecimal unitPrice;

    @Column(nullable = false)
    int quantity;

    @Column(nullable = false, precision = 15, scale = 2)
    BigDecimal totalPrice;

    @Column(nullable = false, updatable = false)
    LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.totalPrice = unitPrice.multiply(BigDecimal.valueOf(quantity));
    }
}

