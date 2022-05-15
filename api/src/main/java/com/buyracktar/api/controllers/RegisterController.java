package com.buyracktar.api.controllers;

import com.buyracktar.api.entities.RegistrationRequest;
import com.buyracktar.api.responsemodels.MyResponseTemplate;
import com.buyracktar.api.services.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
//@AllArgsConstructor
public class RegisterController {
    public RegisterController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }
    @Value("${client.url.login}")
    String redirectUrl;
    private final RegistrationService registrationService;

    @PostMapping(value = "/auth/register")
    public ResponseEntity<Object> postMethodName(@RequestBody RegistrationRequest entity) {
        registrationService.registerNewAccount(entity);
        return ResponseEntity.ok(new MyResponseTemplate(true, "registered",null));
    }

    @GetMapping(value="register/confirm")
    public void confirm(HttpServletResponse response, @RequestParam String token)  throws IOException {
        registrationService.confirmToken(token);
        response.sendRedirect(redirectUrl);
    }

}
