package com.buyracktar.api.controllers;

import com.buyracktar.api.entities.Account;
import com.buyracktar.api.entities.User;
import com.buyracktar.api.responsemodels.MyResponseTemplate;
import com.buyracktar.api.services.AccountService;
import com.buyracktar.api.services.CategoryService;
import com.buyracktar.api.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/accounts")
@AllArgsConstructor
public class AccountController {

    private final UserService userService;
    private final CategoryService categoryService;

    private final AccountService accountService;

    @GetMapping(value = "/{id}/users")
    public ResponseEntity<Object> getAccountsUsers(@PathVariable Long id) {
        Iterable<User> users = userService.getUsers(id);
        return ResponseEntity.ok(new MyResponseTemplate(true, users, null));
    }

    @GetMapping(value = "/categories")
    public ResponseEntity<Object> getCategoriesByAccount(@RequestHeader String Authorization) {
        return ResponseEntity.ok(new MyResponseTemplate(true, categoryService.getByAccount(Authorization),null));
    }

    @GetMapping(value = "/accounts/{id}")
    public ResponseEntity<Object> getAccountById(@PathVariable long id) {
        Account account = accountService.getAccountById(id).orElse(null);
        if(account == null) {
            return ResponseEntity.ok(new MyResponseTemplate(false, null,"account doesn't exists"));
        }
        else
            return ResponseEntity.ok(new MyResponseTemplate(true, account, null));
    }
}
