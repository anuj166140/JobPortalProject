package com.jobportal.backend.controller;

import org.springframework.web.bind.annotation.*;

import com.jobportal.backend.entity.User;
import com.jobportal.backend.service.UserService;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")

@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {

        this.userService = userService;

    }

    // REGISTER USER

    @PostMapping("/register")

    public User registerUser(
            @RequestBody User user){

        return userService.registerUser(user);

    }

    // LOGIN USER

    @PostMapping("/login")

    public Optional<User> loginUser(
            @RequestBody User user){

        return userService.loginUser(
                user.getEmail(),
                user.getPassword()
        );

    }

}