package com.buyracktar.api.services;

import com.buyracktar.api.entities.CategoryTransaction;
import com.buyracktar.api.entities.Wallet;
import com.buyracktar.api.entities.WalletTransaction;
import com.buyracktar.api.repositories.WalletRepository;
import com.buyracktar.api.repositories.WalletTransactionRepository;
import com.buyracktar.api.responsemodels.AllTransactions;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Iterators;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class WalletTransactionService {

    private final WalletTransactionRepository walletTransactionRepository;
    private final WalletRepository walletRepository;

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
}
