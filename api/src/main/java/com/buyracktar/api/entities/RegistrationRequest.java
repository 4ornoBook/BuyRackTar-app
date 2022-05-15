package com.buyracktar.api.entities;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
public class RegistrationRequest {
    private String email;
    private String password;
}
