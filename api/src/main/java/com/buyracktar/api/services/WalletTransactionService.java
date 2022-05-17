package com.buyracktar.api.services;

import com.buyracktar.api.entities.CategoryTransaction;
import com.buyracktar.api.entities.Currency;
import com.buyracktar.api.entities.Wallet;
import com.buyracktar.api.entities.WalletTransaction;
import com.buyracktar.api.repositories.CurrencyRepository;
import com.buyracktar.api.repositories.WalletRepository;
import com.buyracktar.api.repositories.WalletTransactionRepository;
import com.buyracktar.api.responsemodels.AllTransactions;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Iterators;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class WalletTransactionService {

    private final WalletTransactionRepository walletTransactionRepository;
    private final WalletRepository walletRepository;

    private final CurrencyRepository currencyRepository;

    private final CategoryTransactionService categoryTransactionService;

    public AllTransactions getWalletTransactionsByWallet(long walletId) {
        Wallet wallet = walletRepository.findById(walletId).orElse(null);
        if (wallet == null) {
            return null;
        } else {
//            get wallet transaction by wallet (fromWallet and toWallet separately)
            Iterable<WalletTransaction> fromWalletTransactions = walletTransactionRepository.findByFromWallet(wallet);
            Iterable<WalletTransaction> toWalletTransactions = walletTransactionRepository.findByToWallet(wallet);
            Iterator<WalletTransaction> WalletTransactionsIterator = Iterators.concat(fromWalletTransactions.iterator(), toWalletTransactions.iterator());
            List<WalletTransaction> walletTransactionList = ImmutableList.copyOf(WalletTransactionsIterator);

            Iterable<CategoryTransaction> categoryTransactions = categoryTransactionService.getTransactionsByWallet(wallet);
            return new AllTransactions(walletTransactionList, categoryTransactions);
        }
    }

    @Transactional
    public Wallet replenishAccount(long walletId, BigDecimal amount) {
        Wallet wallet = walletRepository.findById(walletId).orElse(null);
        if (wallet == null) {
            return null;
        } else {
            Currency currency = currencyRepository.findById(wallet.getCurrencyId()).orElse(null);
            if(currency == null) {
                return null;
            }
            DecimalFormat df = new DecimalFormat();
            df.setMaximumFractionDigits(2);
            df.setMinimumFractionDigits(0);
            df.setGroupingUsed(false);

            WalletTransaction walletTransaction = new WalletTransaction();
            walletTransaction.setAmount(amount);
            walletTransaction.setTime(LocalDateTime.now());
            walletTransaction.setToWallet(wallet);
            walletTransaction.setName("replenishment operation");
            walletTransaction.setDescription("wallet " + wallet.getName() + " has been replenished of " + df.format(amount)+ " " + currency.getName());
            BigDecimal newBalance = wallet.getAmount().add(amount);
            wallet.setAmount(newBalance);

            walletTransactionRepository.save(walletTransaction);
            walletRepository.save(wallet);
            return wallet;
        }
    }
}
