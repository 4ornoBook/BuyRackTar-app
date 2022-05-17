package com.buyracktar.api.responsemodels;

import com.buyracktar.api.entities.CategoryTransaction;
import com.buyracktar.api.entities.WalletTransaction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AllTransactions {
    private Iterable<WalletTransaction> walletTransactions;
    private Iterable<CategoryTransaction> categoryTransactions;
}
