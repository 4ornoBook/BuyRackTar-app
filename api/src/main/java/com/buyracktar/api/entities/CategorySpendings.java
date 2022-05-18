package com.buyracktar.api.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class CategorySpendings {
    private Long id;
    private BigDecimal amount;
}
