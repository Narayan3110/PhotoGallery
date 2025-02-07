package com.photo.gallery.security;

import com.photo.gallery.model.Role;
import com.photo.gallery.model.User;
import com.photo.gallery.repository.RoleRepository;
import com.photo.gallery.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            Role userRole = roleRepository.findByRoleName(Role.RoleName.USER)
                    .orElseGet(() -> roleRepository.save(new Role(Role.RoleName.USER)));

            Role adminRole = roleRepository.findByRoleName(Role.RoleName.ADMIN)
                    .orElseGet(() -> roleRepository.save(new Role(Role.RoleName.ADMIN)));

            createUserIfNotExists("user1", "user1@example.com", "password1", userRole);
            createUserIfNotExists("Admin1", "nikhilkatoch@gmail.com", "Sanm@3004", adminRole);
        };
    }

    private void createUserIfNotExists(String username, String email, String password, Role role) {
        if (!userRepository.existsByUserName(username)) {
            User user = new User(username, email, passwordEncoder.encode(password));
            user.setRole(role);
            if (role.getRoleName() == Role.RoleName.ADMIN) {
                user.setVerified(true);
            }
            userRepository.save(user);
        }
    }
}
