package com.example.Student.controller;

import com.example.Student.dto.UserDTO;
import com.example.Student.entity.User;
import com.example.Student.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userRepository.findAll().stream()
                .map(user -> new UserDTO(user.getId(), user.getUsername(), user.getRole()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<?> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String newRole = request.get("role");
        if (newRole == null || (!newRole.equals("ROLE_USER") && !newRole.equals("ROLE_ADMIN"))) {
            return ResponseEntity.badRequest().body("Invalid role specified.");
        }

        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        user.setRole(newRole);
        userRepository.save(user);

        return ResponseEntity.ok(new UserDTO(user.getId(), user.getUsername(), user.getRole()));
    }
}
