package com.funcoders.happy_pet_shop.entity;
import com.funcoders.happy_pet_shop.constant.UserRole;
import com.funcoders.happy_pet_shop.constant.UserStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @Column(nullable = false)
    private String passwordHash;

    private String address;
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status;

    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    @OneToMany(mappedBy = "user")
    private List<Invoice> invoices;
}