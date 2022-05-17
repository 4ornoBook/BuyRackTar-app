package com.buyracktar.api.entities;


import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class CurrencyExchange {
    private int r030;
    private String txt;
    private BigDecimal rate;
    private String cc;
    private LocalDate exchangedate;
}
