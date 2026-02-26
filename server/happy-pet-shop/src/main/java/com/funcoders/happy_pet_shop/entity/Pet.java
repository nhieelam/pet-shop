package com.funcoders.happy_pet_shop.entity;

import com.funcoders.happy_pet_shop.constant.ItemStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "pets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "breed_id")
    private Breed breed;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(nullable = false)
    private String petName;

    private LocalDate birthday;
    private String furColor;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String imageUrl;

    @Column(nullable = false)
    private BigDecimal basePrice;

    @Enumerated(EnumType.STRING)
    private ItemStatus status;

    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}