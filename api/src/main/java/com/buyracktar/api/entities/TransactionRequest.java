package com.buyracktar.api.entities;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class TransactionRequest {
    private Long walletId;
    private Long categoryId;
    private BigDecimal amount;
}

