package com.buyracktar.api.services;

import com.buyracktar.api.entities.Wallet;
import com.buyracktar.api.entities.WalletTransaction;
import com.buyracktar.api.repositories.WalletRepository;
import com.buyracktar.api.repositories.WalletTransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedList;

@Service
@AllArgsConstructor
public class WalletTransactionService {

    private final WalletTransactionRepository walletTransactionRepository;
    private final WalletRepository walletRepository;

    public Iterable<WalletTransaction> getWalletTransactionsByWallet(long walletId) {
        Wallet wallet = walletRepository.findById(walletId).orElse(null);
        if (wallet == null) {
            return null;
        } else {
            return walletTransactionRepository.findByToWallet(wallet);
        }
    }
}
