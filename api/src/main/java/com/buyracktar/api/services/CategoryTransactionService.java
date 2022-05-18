package com.buyracktar.api.services;

import com.buyracktar.api.entities.*;
import com.buyracktar.api.repositories.CategoryRepository;
import com.buyracktar.api.repositories.CategoryTransactionRepository;
import com.buyracktar.api.repositories.WalletRepository;
import com.buyracktar.api.responsemodels.MyResponseTemplate;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class CategoryTransactionService {
    private final CategoryTransactionRepository transactionRepository;

    private final CategoryRepository categoryRepository;
    private final WalletRepository walletRepository;

    public Iterable<CategoryTransaction> getTransactionsByCategory(long id) {
        return transactionRepository.findByCategoryId(id);
    }

    public Iterable<CategoryTransaction> getTransactionsByWallet(Wallet wallet) {
        return transactionRepository.findCategoryTransactionByWallet(wallet);
    }

    public Iterable<CategoryTransaction> getByUserId(long userId) {
        return transactionRepository.findByUserId(userId);
    }

    @Transactional
    public ResponseEntity<MyResponseTemplate> makeCategoryTransaction(long fromWalletId, long toCategoryId, BigDecimal amount) {
        Wallet sourceWallet = walletRepository.findById(fromWalletId).orElse(null);
        Category destinationCategory = categoryRepository.findById(toCategoryId).orElse(null);
        if (sourceWallet == null || destinationCategory == null) {
            return new ResponseEntity<>(new MyResponseTemplate(false, null, "wrong wallet"), HttpStatus.BAD_REQUEST);
        } else {
            //            check if the wallet has enough money for the transaction
            if (sourceWallet.getAmount().subtract(amount).compareTo(BigDecimal.ZERO) < 0) {
                return new ResponseEntity<>(new MyResponseTemplate(false, null, "wallet balance is not enough for the transaction"), HttpStatus.BAD_REQUEST);
            }
//            take money from balance
            sourceWallet.setAmount(sourceWallet.getAmount().subtract(amount));

            //            check wallet's currency
            if (!sourceWallet.getCurrencyId().equals(destinationCategory.getCurrencyId())) {
                //if currencies are not the same
                // convertMoney in category's currency
                amount = CurrenciesManager.convertCurrency(sourceWallet.getCurrencyId(), destinationCategory.getCurrencyId(), amount);
            }

            //create a transaction
            CategoryTransaction categoryTransaction = new CategoryTransaction();
            categoryTransaction.setWallet(sourceWallet);
            categoryTransaction.setCategory(destinationCategory);
            categoryTransaction.setAmount(amount);
            categoryTransaction.setDescription("transaction from " + sourceWallet.getName());
            categoryTransaction.setTime(LocalDateTime.now());

//            save wallet with new balance
            walletRepository.save(sourceWallet);
//            save categories
            transactionRepository.save(categoryTransaction);
            return ResponseEntity.ok(new MyResponseTemplate(true, categoryTransaction, null));
        }
    }
}
