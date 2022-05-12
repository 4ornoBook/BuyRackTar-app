package com.buyracktar.api.controllers;

import com.buyracktar.api.entities.User;
import com.buyracktar.api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {

    @Autowired
    UserService userService;

    @GetMapping(value = "/account/{id}")
    public ResponseEntity<Object> getAccountsUsers(@RequestParam Long id) {
//        Iterable<User> users = userRepository.getByAccountId(id);
//        todo
        return ResponseEntity.ok("");
    }
}
