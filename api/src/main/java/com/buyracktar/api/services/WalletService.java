package com.buyracktar.api.services;

import com.buyracktar.api.entities.Wallet;
import com.buyracktar.api.repositories.WalletRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class WalletService {

    private final WalletRepository walletRepository;

    public Iterable<Wallet> getWalletsByUserId(long id) {
        return walletRepository.findByUserId(id);
    }
}
