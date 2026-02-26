package com.funcoders.happy_pet_shop.entity;
import com.funcoders.happy_pet_shop.constant.ItemStatus;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false)
    private String name;

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