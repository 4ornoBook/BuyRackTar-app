package com.byracktar.api.model.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class WalletTransaction {
    private Long id;
    private Long fromWalletId;
    private Long toWalletId;
    private BigDecimal amount;
    private LocalDateTime time;
    private String description;
}
