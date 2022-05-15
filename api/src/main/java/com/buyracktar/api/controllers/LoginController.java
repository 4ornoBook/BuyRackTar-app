package com.buyracktar.api.controllers;

import com.buyracktar.api.responsemodels.MyResponseTemplate;
import com.buyracktar.api.entities.Account;
import com.buyracktar.api.responsemodels.LoginResponse;
import com.buyracktar.api.services.AccountService;
import com.buyracktar.api.security.jwtutils.TokenManager;
import com.buyracktar.api.security.jwtutils.models.LoginRequestModel;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController
@AllArgsConstructor
public class LoginController {

    private final AccountService userDetailsService;

    private final AuthenticationManager authenticationManager;

    private final TokenManager tokenManager;

    @PostMapping(value = "auth/login")
    public ResponseEntity<Object> createToken(@RequestBody LoginRequestModel
                                                      request) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (DisabledException e) {
            System.out.println("disabled: " + e.getMessage());
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            return ResponseEntity.ok(new MyResponseTemplate(false, null,e.getMessage()));
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        Account account = (Account) userDetails;
        final String accessToken = tokenManager.generateJwtToken(userDetails);
        return ResponseEntity.ok(new MyResponseTemplate(true, new LoginResponse(accessToken,account), null));
    }
}
