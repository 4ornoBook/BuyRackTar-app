package com.byracktar.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.byracktar.api.model.LoginCredentials;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class LoginController {
    @PostMapping(value="auth/login")
    public void postMethodName(@RequestBody LoginCredentials entity) {
        //TODO: process POST request
        // return entity;
    }
    
}
