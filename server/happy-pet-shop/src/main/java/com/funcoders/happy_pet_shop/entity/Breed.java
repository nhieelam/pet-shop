package com.funcoders.happy_pet_shop.entity;
import com.funcoders.happy_pet_shop.entity.Pet;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;



@Entity
@Table(name = "breeds")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Breed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @OneToMany(mappedBy = "breed")
    private List<Pet> pets;
}