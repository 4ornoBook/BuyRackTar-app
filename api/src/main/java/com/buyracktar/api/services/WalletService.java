package com.buyracktar.api.services;

import com.buyracktar.api.entities.Wallet;
import com.buyracktar.api.repositories.WalletRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class WalletService {

    private final WalletRepository walletRepository;

    public Iterable<Wallet> getWalletsByUserId(long id) {
        return walletRepository.findByUserId(id);
    }

    public Wallet getWalletById(long userId, long walletId) {
        Wallet wallet = walletRepository.findById(walletId).orElse(null);
        if(wallet == null || wallet.getUserId() != userId) {
            return null;
        }
        else {
            return wallet;
        }
    }

    public Wallet updateWallet(long userId, long walletId, Wallet wallet) {
        Wallet DbWallet = walletRepository.findById(walletId).orElse(null);
        if(DbWallet == null || DbWallet.getUserId() != userId) {
            return null;
        }
        else {
            wallet.setId(DbWallet.getId());
            return walletRepository.save(wallet);
        }
    }
}
