package com.buyracktar.api.responsemodels;

import com.buyracktar.api.entities.Account;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {

    String accessToken;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    Account account;
}
