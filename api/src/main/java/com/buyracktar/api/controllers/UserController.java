package com.buyracktar.api.controllers;

import com.buyracktar.api.responsemodels.AllTransactions;
import com.buyracktar.api.responsemodels.MyResponseTemplate;
import com.buyracktar.api.services.UserService;
import com.buyracktar.api.services.WalletTransactionService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class UserController {
    private final WalletTransactionService walletTransactionService;


    @GetMapping(value = "users/{userId}/transactions")
    public ResponseEntity<Object> getUserTransactions(@PathVariable long userId) {
        AllTransactions userTransactions = walletTransactionService.getUserTransactions(userId);
        if(userTransactions == null) {
            return new ResponseEntity<>(new MyResponseTemplate(false, null, "user doesn't exists"), HttpStatus.BAD_REQUEST);
        } else {
            return ResponseEntity.ok(new MyResponseTemplate(true, userTransactions,null));
        }
    }
}
