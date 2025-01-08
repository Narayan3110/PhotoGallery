package com.photo.gallery.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long roleId;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_name", unique = true)
    private RoleName roleName;

    // Enum for role names
    public enum RoleName {
        ADMIN,
        USER
    }

    public Role(RoleName roleName) {
        this.roleName = roleName;
    }
    public Role(){

    }

    // Lombok's @Data already generates the getter and setter methods for all fields,
    // But for clarity, here they are explicitly defined:

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public RoleName getRoleName() {
        return roleName;
    }

    public void setRoleName(RoleName roleName) {
        this.roleName = roleName;
    }
}
