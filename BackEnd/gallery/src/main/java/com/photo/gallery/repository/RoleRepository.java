package com.photo.gallery.repository;

import com.photo.gallery.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    // Custom query to find a role by its name
    Optional<Role> findByRoleName(Role.RoleName roleName);
}
