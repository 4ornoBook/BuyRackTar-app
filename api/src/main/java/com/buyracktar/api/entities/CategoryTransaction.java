package com.buyracktar.api.entities;

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
public class CategoryTransaction {
    private Long id;
    private Long walletId;
    private Long categoryId;
    private BigDecimal amount;
    private LocalDateTime time;
    private String description;
}
