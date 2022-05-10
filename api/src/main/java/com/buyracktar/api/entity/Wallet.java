package com.buyracktar.api.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Wallet {
    private Long id;
    private Long userId;
    private Long currencyId;
    private BigDecimal amount; 
}
