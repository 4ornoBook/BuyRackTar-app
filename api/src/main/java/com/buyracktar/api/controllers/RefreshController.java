package com.buyracktar.api.controllers;

import com.buyracktar.api.entities.Account;
import com.buyracktar.api.responsemodels.JwtTokens;
import com.buyracktar.api.responsemodels.LoginResponse;
import com.buyracktar.api.responsemodels.MyResponseTemplate;
import com.buyracktar.api.security.jwtutils.TokenManager;
import com.buyracktar.api.services.AccountService;
import com.google.common.net.HttpHeaders;
import lombok.AllArgsConstructor;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.stream.Stream;

@Controller
@AllArgsConstructor
public class RefreshController {

    private final AccountService accountService;

    private final TokenManager tokenManager;

    @GetMapping("/auth/refresh")
    public ResponseEntity<Object> refreshToken(@CookieValue(name = "refreshToken",defaultValue = "") String refreshToken) {
        if (refreshToken == null || refreshToken.isEmpty()) {
            return new ResponseEntity<>(new MyResponseTemplate(false, null, "refresh token is not exists"), HttpStatus.UNAUTHORIZED);
        } else {
            Account account = accountService.getAccountByMail(tokenManager.getUsernameFromToken(refreshToken) );
            if (tokenManager.validateJwtToken(refreshToken, account)) {
                String accessToken = tokenManager.generateJwtToken(account);
                String newRefreshToken = tokenManager.generateJwtRefreshToken(account);
                ResponseCookie cookieHttp = ResponseCookie.from("refreshToken", newRefreshToken)
                        .httpOnly(true)
                        .sameSite("Lax")
                        .secure(true)
                        .path("/auth")
                        .build();
                return ResponseEntity
                        .ok()
                        .header(HttpHeaders.SET_COOKIE, cookieHttp.toString())
                        .body(new MyResponseTemplate(true, new LoginResponse(accessToken, null), null));
            }
        }
        return new ResponseEntity<>(new MyResponseTemplate(false, null, "session has expired"),HttpStatus.UNAUTHORIZED);
    }
}
