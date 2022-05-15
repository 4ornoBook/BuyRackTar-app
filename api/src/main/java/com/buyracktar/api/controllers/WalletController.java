package com.buyracktar.api.controllers;

import com.buyracktar.api.entities.Wallet;
import com.buyracktar.api.responsemodels.MyResponseTemplate;
import com.buyracktar.api.services.WalletService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class WalletController {

    private final WalletService walletService;
    @GetMapping(value = "/users/{id}/wallets")
    public ResponseEntity<Object> getUserWallets(@PathVariable long id) {
        return ResponseEntity.ok(new MyResponseTemplate(true, walletService.getWalletsByUserId(id),null));
    }

    @GetMapping(value = "users/{userId}/wallets/{walletId}")
    public ResponseEntity<Object> getWalletById(@PathVariable long userId, @PathVariable long walletId) {
        Wallet wallet = walletService.getWalletById(userId, walletId);
        if(wallet == null) {
            return ResponseEntity.ok(new MyResponseTemplate(false, null, "wallet does not exists"));
        }
        else {
            return ResponseEntity.ok(new MyResponseTemplate(true, wallet, null));
        }
    }

    @PutMapping(value = "users/{userId}/wallets/{walletId}")
    public ResponseEntity<Object> updateWallet(@PathVariable long userId, @PathVariable long walletId, @RequestBody Wallet wallet) {
        Wallet updatedWallet  = walletService.updateWallet(userId, walletId, wallet);
        if(updatedWallet == null) {
            return ResponseEntity.ok(new MyResponseTemplate(false, null, "wallet cannot be updated"));
        }
        else {
            return ResponseEntity.ok(new MyResponseTemplate(true, updatedWallet, null));
        }
    }

    @PostMapping(value = "/users/{userId}/wallets")
    public ResponseEntity<Object> createWallet(@PathVariable long userId, @RequestBody Wallet wallet) {
        return ResponseEntity.ok(new MyResponseTemplate(true, walletService.addWallet(userId, wallet),null));
    }
}
