package com.buyracktar.api.controllers;

import com.buyracktar.api.responsemodels.MyResponseTemplate;
import com.buyracktar.api.services.WalletService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class WalletController {

    private final WalletService walletService;
    @GetMapping(value = "/users/{id}/wallets")
    public ResponseEntity<Object> getUserWallets(@PathVariable long id) {
        return ResponseEntity.ok(new MyResponseTemplate(true, walletService.getWalletsByUserId(id),null));
    }
}
