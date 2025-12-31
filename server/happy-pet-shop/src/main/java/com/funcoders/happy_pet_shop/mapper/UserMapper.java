package com.funcoders.happy_pet_shop.mapper;

import com.funcoders.happy_pet_shop.dto.request.UserCreationRequest;
import com.funcoders.happy_pet_shop.dto.request.UserUpdateRequest;
import com.funcoders.happy_pet_shop.dto.response.UserResponse;
import com.funcoders.happy_pet_shop.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "username", target = "userName")
    @Mapping(target = "roles", ignore = true)
    UserEntity toUserEntity(UserCreationRequest request);

    void updateUser(@MappingTarget UserEntity userEntity, UserUpdateRequest request);

    @Mapping(source = "userName", target = "username")
    UserResponse toUserResponse(UserEntity userEntity);
}
