package com.buyracktar.api.controllers;

import com.buyracktar.api.entities.WalletTransaction;
import com.buyracktar.api.repositories.WalletTransactionRepository;
import com.buyracktar.api.responsemodels.AllTransactions;
import com.buyracktar.api.responsemodels.MyResponseTemplate;
import com.buyracktar.api.services.WalletTransactionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class WalletTransactionController {

    private final WalletTransactionService walletTransactionService;

    @GetMapping(value = "/wallets/{walletId}/transactions")
    public ResponseEntity<Object> getWalletTransactions(@PathVariable long walletId) {
        AllTransactions allTransactions = walletTransactionService.getWalletTransactionsByWallet(walletId);
        if (allTransactions == null) {
            return new ResponseEntity<>(new MyResponseTemplate(false, null, "wrong wallet id"), HttpStatus.BAD_REQUEST);
        } else {
            return ResponseEntity.ok(new MyResponseTemplate(true, allTransactions, null));
        }
    }
}
