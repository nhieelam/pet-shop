package com.funcoders.happy_pet_shop.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String name;

    private String description;

    @OneToMany(mappedBy = "category")
    private List<Product> products;

    @OneToMany(mappedBy = "category")
    private List<Pet> pets;
}