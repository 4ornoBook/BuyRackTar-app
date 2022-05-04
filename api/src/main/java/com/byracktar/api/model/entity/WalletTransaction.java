package com.byracktar.api.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WalletTransaction {

    private Long id;

    private Long fromWalletId;

    private Long toWalletId;

    private String name;

    private BigDecimal amount;

    private LocalDateTime time;

    private String description;
}
