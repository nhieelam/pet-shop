package com.funcoders.happy_pet_shop.entity;
import com.funcoders.happy_pet_shop.constant.PromotionStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "promotions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String description;

    private OffsetDateTime startDate;
    private OffsetDateTime endDate;

    @Enumerated(EnumType.STRING)
    private PromotionStatus status;

    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    @OneToMany(mappedBy = "promotion")
    private List<PromotionDetail> details;
}