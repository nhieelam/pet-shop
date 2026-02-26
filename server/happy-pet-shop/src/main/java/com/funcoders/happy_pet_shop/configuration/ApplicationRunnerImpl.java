package com.funcoders.happy_pet_shop.configuration;

import com.funcoders.happy_pet_shop.constant.UserRole;
import com.funcoders.happy_pet_shop.entity.User;
import com.funcoders.happy_pet_shop.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Profile("!test")
public class ApplicationRunnerImpl implements ApplicationRunner {


    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("Application init...");
    }
}
