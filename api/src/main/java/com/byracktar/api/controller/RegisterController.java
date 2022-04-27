package com.byracktar.api.controller;

import com.byracktar.api.model.entity.Account;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class RegisterController {
    
    @PostMapping(value="/auth/register")
    public void postMethodName(@RequestBody Account entity) {
        //TODO: process POST request
    
        // return entity;
    }
    
}
