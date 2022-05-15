package com.buyracktar.api.responsemodels;

import com.buyracktar.api.entities.Account;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {

    String accessToken;

    Account account;
}
