package com.funcoders.happy_pet_shop.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "cart_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @Column(nullable = false)
    private Integer quantity;

    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}