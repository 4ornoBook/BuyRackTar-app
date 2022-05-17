package com.buyracktar.api.responsemodels;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JwtTokens {

    private String token;
    private String refreshToken;
}
