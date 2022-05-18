package com.buyracktar.api.controllers;

import com.buyracktar.api.entities.CategoryTransaction;
import com.buyracktar.api.entities.TransactionRequest;
import com.buyracktar.api.entities.Wallet;
import com.buyracktar.api.entities.WalletTransaction;
import com.buyracktar.api.repositories.WalletTransactionRepository;
import com.buyracktar.api.responsemodels.AllTransactions;
import com.buyracktar.api.responsemodels.MyResponseTemplate;
import com.buyracktar.api.services.CategoryTransactionService;
import com.buyracktar.api.services.WalletTransactionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@AllArgsConstructor
public class WalletTransactionController {

    private final WalletTransactionService walletTransactionService;

    private final CategoryTransactionService categoryTransactionService;

    @GetMapping(value = "/wallets/{walletId}/transactions")
    public ResponseEntity<Object> getWalletTransactions(@PathVariable long walletId) {
        AllTransactions allTransactions = walletTransactionService.getWalletTransactionsByWallet(walletId);
        if (allTransactions == null) {
            return new ResponseEntity<>(new MyResponseTemplate(false, null, "wrong wallet id"), HttpStatus.BAD_REQUEST);
        } else {
            return ResponseEntity.ok(new MyResponseTemplate(true, allTransactions, null));
        }
    }

    @PostMapping(value = "wallets/{walletId}/replenish")
    public ResponseEntity<Object> replenishWallet(@PathVariable long walletId, @RequestBody Wallet wallet) {
        BigDecimal amount = wallet.getAmount();
        System.out.println(amount);
        WalletTransaction replenishmentWalletTransaction = walletTransactionService.replenishAccount(walletId, amount);
        if (replenishmentWalletTransaction == null) {
            return new ResponseEntity<>(new MyResponseTemplate(false, null, "wallet doesn't exists"), HttpStatus.BAD_REQUEST);
        } else {
            return ResponseEntity.ok(new MyResponseTemplate(true, replenishmentWalletTransaction, null));
        }
    }

    @PostMapping(value = "/wallets/{fromWalletId}/transactions")
    public ResponseEntity<MyResponseTemplate> makeTransaction(@PathVariable long fromWalletId,@RequestBody TransactionRequest transactionRequest) {
        if(transactionRequest.getWalletId() != null) {
            return walletTransactionService.makeWalletTransaction(fromWalletId, transactionRequest.getWalletId(), transactionRequest.getAmount());
        }
        else if(transactionRequest.getCategoryId() != null) {
            return categoryTransactionService.makeCategoryTransaction(fromWalletId, transactionRequest.getCategoryId(), transactionRequest.getAmount());
        }
        return new ResponseEntity<>(new MyResponseTemplate(false, null,"transaction error"),HttpStatus.BAD_REQUEST);
//      between wallets transaction name wallets transaction;
//      wallets transaction description is from wallet1 to wallet2;
//      category transaction description is transaction from wallet in category
    }
}
