package com.buyracktar.api.controller;

import com.buyracktar.api.entity.LoginCredentials;
import com.buyracktar.api.entity.Account;

import com.buyracktar.api.entity.User;
import com.buyracktar.api.repository.AccountRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashSet;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@Log4j2
public class RegisterController {


    @Autowired
    AccountRepository accountRepository;

    @PostMapping(value="/auth/register")
    public Account postMethodName(@RequestBody LoginCredentials entity) {
//       create an account
//       create a user - account owner
//        send account confirmation mail
//        put user and account into database
        Account account = new Account();
        account.setEmail(entity.getEmail());
//        account.setPassword(PasswordCryptor.encodePassword(entity.getPassword()));
        User user = new User();
        user.setOwner(true);
        account.setUsers(new HashSet<>(){{
            add(user);
        }
        });
        accountRepository.save(account);
        System.out.println("register controller is working");
        return account;
        // return entity;
    }
    
}
