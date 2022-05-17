package com.buyracktar.api.entities;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.Map;

public class CurrenciesManager {

    private static Map<Long, BigDecimal> currencyPrice= new HashMap<>();

    static {
        currencyPrice.put(1L,BigDecimal.valueOf(29.2549));//dollar840
        currencyPrice.put(2L,BigDecimal.valueOf(30.842));//euro978
        currencyPrice.put(3L,BigDecimal.valueOf(1));//hryvna980
        currencyPrice.put(4L,BigDecimal.valueOf(6.6396));// zloty985
        currencyPrice.put(5L,BigDecimal.valueOf(0.22625));// yen392
        currencyPrice.put(6L,BigDecimal.valueOf(36.5262));//pound826
        currencyPrice.put(7L,BigDecimal.valueOf(22.8171));//Canadian dollar124
        currencyPrice.put(8L,BigDecimal.valueOf(4.3504));//yuan156
    }

    public static BigDecimal convertCurrency(long toCurrencyCode, long fromCurrencyCode, BigDecimal value) {
        if(!currencyPrice.containsKey(fromCurrencyCode) || !currencyPrice.containsKey(toCurrencyCode)) {
            return null;
        }
        else {
            BigDecimal result = value.multiply(currencyPrice.get(fromCurrencyCode));
            return result.divide(currencyPrice.get(toCurrencyCode),2, RoundingMode.CEILING);
        }
    }
}
