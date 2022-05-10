package com.buyracktar.api.controller;

import com.buyracktar.api.MyResponse;
import com.buyracktar.api.entity.Account;
import com.buyracktar.api.security.jwtutils.JwtUserDetailsService;
import com.buyracktar.api.security.jwtutils.TokenManager;
import com.buyracktar.api.security.jwtutils.models.JwtRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.client.RestTemplate;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class LoginController {

    @Autowired
    private JwtUserDetailsService userDetailsService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenManager tokenManager;

    @PostMapping(value = "auth/login")
    public ResponseEntity<Object> createToken(@RequestBody JwtRequestModel
                                                      request) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(),
                            request.getPassword())
            );
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        final String accessToken = tokenManager.generateJwtToken(userDetails);
        RestTemplate rest = new RestTemplate();
//		return ResponseEntity.ok(new MyResponse(true, jwtToken));
//      return ResponseEntity.ok(new MyResponse(true,accessToken,new Account(1L,"asfd","asdfs",true)));
        return ResponseEntity.ok(accessToken);
    }
}
