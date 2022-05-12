package com.buyracktar.api.controllers;

import com.buyracktar.api.responsemodels.MyResponseTemplate;
import com.buyracktar.api.entities.Account;
import com.buyracktar.api.repositories.AccountRepository;
import com.buyracktar.api.responsemodels.LoginResponse;
import com.buyracktar.api.services.AccountDetailsService;
import com.buyracktar.api.security.jwtutils.TokenManager;
import com.buyracktar.api.security.jwtutils.models.LoginRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class LoginController {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    private AccountDetailsService userDetailsService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenManager tokenManager;

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
            System.out.println("bad credentials:" + e.getMessage());
            throw new Exception("INVALID_CREDENTIALS", e);
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        Account account = (Account) userDetails;
        final String accessToken = tokenManager.generateJwtToken(userDetails);
        return ResponseEntity.ok(new MyResponseTemplate(true, new LoginResponse(accessToken,account), null));
    }
}
