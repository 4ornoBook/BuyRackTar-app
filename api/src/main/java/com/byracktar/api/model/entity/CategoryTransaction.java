package com.byracktar.api.model.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CategoryTransaction {
    private Long id;
    private Long walletId;
    private Long categoryId;
    private BigDecimal amount;
    private LocalDateTime time;
    private String description;
}
