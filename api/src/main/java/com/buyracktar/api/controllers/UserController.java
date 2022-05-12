package com.buyracktar.api.controllers;

import com.buyracktar.api.entities.User;
import com.buyracktar.api.responsemodels.MyResponseTemplate;
import com.buyracktar.api.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping(value = "/accounts/{id}")
    public ResponseEntity<Object> getAccountsUsers(@PathVariable Long id) {
        Iterable<User> users = userService.getUsers(id);
        return ResponseEntity.ok(new MyResponseTemplate(true, users, null));
    }
}
