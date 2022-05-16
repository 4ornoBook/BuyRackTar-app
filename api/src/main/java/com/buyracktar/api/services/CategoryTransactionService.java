package com.buyracktar.api.services;

import com.buyracktar.api.entities.CategoryTransaction;
import com.buyracktar.api.entities.Wallet;
import com.buyracktar.api.repositories.CategoryTransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CategoryTransactionService {
    private final CategoryTransactionRepository transactionRepository;

    public Iterable<CategoryTransaction> getTransactionsByCategory(long id) {
        return transactionRepository.findByCategoryId(id);
    }

    public Iterable<CategoryTransaction> getTransactionsByWallet(Wallet wallet) {
        return transactionRepository.findCategoryTransactionByWallet(wallet);
    }
}
