package com.photo.gallery.controller;


import com.photo.gallery.dtos.UserDTO;
import com.photo.gallery.dtos.UserDetailDTO;
import com.photo.gallery.model.Role;
import com.photo.gallery.model.User;
import com.photo.gallery.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
//@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {

    @Autowired
    UserService userService;

//    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/getusers")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(),
                HttpStatus.OK);
    }

//    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/update-role")
    public ResponseEntity<String> updateUserRole(@RequestParam Long userId,
                                                 @RequestParam String roleName) {
        userService.updateUserRole(userId, roleName);
        return ResponseEntity.ok("User role updated");
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<UserDetailDTO> getUserDetails(@PathVariable Long userId) {
        UserDetailDTO userDetails = userService.getUserById(userId);
        return ResponseEntity.ok(userDetails);
    }


    //    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/roles")
    public List<Role> getAllRoles() {
        return userService.getAllRoles();
    }


//    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestParam Long userId,
                                                 @RequestParam String password) {
        try {
            userService.updatePassword(userId, password);
            return ResponseEntity.ok("Password updated");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        userService.deleteVerifiedUser(id);
        return new ResponseEntity<>("User Deleted Successfully",HttpStatus.OK);
    }

}
