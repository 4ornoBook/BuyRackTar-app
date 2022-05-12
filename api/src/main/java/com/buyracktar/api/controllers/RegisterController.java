package com.buyracktar.api.controllers;

import com.buyracktar.api.entities.LoginCredentials;
import com.buyracktar.api.entities.Account;

import com.buyracktar.api.entities.RegistrationRequest;
import com.buyracktar.api.entities.User;
import com.buyracktar.api.repositories.AccountRepository;
import com.buyracktar.api.responsemodels.MyResponseTemplate;
import com.buyracktar.api.services.RegistrationService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@AllArgsConstructor
public class RegisterController {

    private final RegistrationService registrationService;

    @PostMapping(value = "/auth/register")
    public ResponseEntity<Object> postMethodName(@RequestBody RegistrationRequest entity) {
        registrationService.registerNewAccount(entity);
        return ResponseEntity.ok(new MyResponseTemplate(true, "registered",null));
    }

    @GetMapping(value="register/confirm")
    public String confirm(@RequestParam String token) {
        return registrationService.confirmToken(token);
    }

}
