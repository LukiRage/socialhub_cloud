package com.springboot.socialhub_api.api.controller;

import com.springboot.socialhub_api.api.model.LoginCredentials;
import com.springboot.socialhub_api.api.model.LoginResponse;
import com.springboot.socialhub_api.api.model.User;
import com.springboot.socialhub_api.api.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping
    public boolean isLoggedIn(@RequestHeader("Authorization")String token){
        return this.authService.isLoggedIn(token);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginCredentials loginCredentials){
        return this.authService.login(loginCredentials);
    }

    @PostMapping("/register")
    public void register(@RequestBody User user){
        this.authService.register(user);
    }
}
