package com.buyracktar.api.services;

import com.buyracktar.api.entities.*;
import com.buyracktar.api.repositories.CurrencyRepository;
import com.buyracktar.api.repositories.WalletRepository;
import com.buyracktar.api.repositories.WalletTransactionRepository;
import com.buyracktar.api.responsemodels.AllTransactions;
import com.buyracktar.api.responsemodels.MyResponseTemplate;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Iterators;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Service
@AllArgsConstructor
public class WalletTransactionService {

    private final UserService userService;
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
            List<WalletTransaction> fromWalletTransactionsList = new LinkedList<>();
            for (WalletTransaction t : fromWalletTransactions) {
                t.setAmount(CurrenciesManager.convertCurrency(t.getToWallet().getCurrencyId(),t.getFromWallet().getCurrencyId(), t.getAmount()));
                fromWalletTransactionsList.add(t);
            }
            Iterable<WalletTransaction> toWalletTransactions = walletTransactionRepository.findByToWallet(wallet);
            Iterator<WalletTransaction> WalletTransactionsIterator = Iterators.concat(fromWalletTransactionsList.iterator(), toWalletTransactions.iterator());
            List<WalletTransaction> walletTransactionList = ImmutableList.copyOf(WalletTransactionsIterator);

            Iterable<CategoryTransaction> categoryTransactions = categoryTransactionService.getTransactionsByWallet(wallet);
            return new AllTransactions(walletTransactionList, categoryTransactions);
        }
    }

    public AllTransactions getUserTransactions(long userId) {
        User user = userService.getById(userId);
        if (user == null) {
            return null;
        } else {
            Iterable<WalletTransaction> userWalletTransactions = walletTransactionRepository.findByUserId(userId);
            Iterable<CategoryTransaction> userCategoryTransactions = categoryTransactionService.getByUserId(userId);
            AllTransactions allTransactions = new AllTransactions(userWalletTransactions, userCategoryTransactions);
            return allTransactions;
        }
    }

    @Transactional
    public WalletTransaction replenishAccount(long walletId, BigDecimal amount) {
        Wallet wallet = walletRepository.findById(walletId).orElse(null);
        if (wallet == null) {
            return null;
        } else {
            Currency currency = currencyRepository.findById(wallet.getCurrencyId()).orElse(null);
            if (currency == null) {
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
            walletTransaction.setDescription("wallet " + wallet.getName() + " has been replenished of " + df.format(amount) + " " + currency.getName());
            BigDecimal newBalance = wallet.getAmount().add(amount);
            wallet.setAmount(newBalance);

            walletTransactionRepository.save(walletTransaction);
            walletRepository.save(wallet);
            return walletTransaction;
        }
    }

    @Transactional
    public ResponseEntity<MyResponseTemplate> makeWalletTransaction(long fromWalletId, long toWalletId, BigDecimal amount) {
        Wallet sourceWallet = walletRepository.findById(fromWalletId).orElse(null);
        Wallet destinationWallet = walletRepository.findById(toWalletId).orElse(null);
        if (sourceWallet == null || destinationWallet == null) {
            return new ResponseEntity<>(new MyResponseTemplate(false, null, "wallet error"), HttpStatus.BAD_REQUEST);
        } else {
//            check if the wallet has enough money for the transaction
            if (sourceWallet.getAmount().subtract(amount).compareTo(BigDecimal.ZERO) < 0) {
                return new ResponseEntity<>(new MyResponseTemplate(false, null, "wallet balance is not enough for the transaction"), HttpStatus.BAD_REQUEST);
            }
//            take money from source wallet
            sourceWallet.setAmount(sourceWallet.getAmount().subtract(amount));

//            check wallet's currency
            if (!sourceWallet.getCurrencyId().equals(destinationWallet.getCurrencyId())) {
//                if currencies are not the same
//                convertMoney in destination wallet's currency
                amount = CurrenciesManager.convertCurrency(sourceWallet.getCurrencyId(), destinationWallet.getCurrencyId(), amount);
            }
//          add money to destination wallet
            destinationWallet.setAmount(destinationWallet.getAmount().add(amount));
//          create a transaction
            WalletTransaction walletTransaction = new WalletTransaction();
            walletTransaction.setFromWallet(sourceWallet);
            walletTransaction.setToWallet(destinationWallet);
            walletTransaction.setAmount(amount);
            walletTransaction.setName("transaction between wallets");
            walletTransaction.setDescription("transaction from " + sourceWallet.getName() + " to " + destinationWallet.getName());
            walletTransaction.setTime(LocalDateTime.now());


//          update source wallet and destination wallets with new balances
            walletRepository.save(sourceWallet);
            walletRepository.save(destinationWallet);

//          add transaction
            walletTransactionRepository.save(walletTransaction);
            return ResponseEntity.ok(new MyResponseTemplate(true, walletTransaction, null));
        }
    }
}
