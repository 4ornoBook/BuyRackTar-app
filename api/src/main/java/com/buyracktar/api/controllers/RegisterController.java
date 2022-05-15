package com.buyracktar.api.controllers;

import com.buyracktar.api.entities.Account;
import com.buyracktar.api.entities.RegistrationRequest;
import com.buyracktar.api.responsemodels.MyResponseTemplate;
import com.buyracktar.api.services.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
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
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> postMethodName(@RequestBody RegistrationRequest entity) {
        Account account = registrationService.registerNewAccount(entity);
        if(account == null) {
            return new ResponseEntity<>(new MyResponseTemplate(false, null,"email is already used"),HttpStatus.BAD_REQUEST);
        }
        else {
            return ResponseEntity.ok(new MyResponseTemplate(true, "registered",null));
        }
    }

    @GetMapping(value="register/confirm")
    public void confirm(HttpServletResponse response, @RequestParam String token)  throws IOException {
        registrationService.confirmToken(token);
        response.sendRedirect(redirectUrl);
    }

}
