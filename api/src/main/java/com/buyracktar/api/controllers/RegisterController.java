package com.buyracktar.api.controllers;

import com.buyracktar.api.entities.RegistrationRequest;
import com.buyracktar.api.responsemodels.MyResponseTemplate;
import com.buyracktar.api.services.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
