package com.buyracktar.api.services;

import com.buyracktar.api.entities.Account;
import com.buyracktar.api.entities.User;
import com.buyracktar.api.repositories.AccountRepository;
import com.buyracktar.api.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AccountService accountService;

    public Iterable<User> getUsers(Long accountId) {
        return userRepository.getByAccountId(accountId);
    }

    public User addNewUser(long accountId, User newUser) {
        Account account =  accountService.getAccountById(accountId).orElse(null);
        if(account == null) {
            return null;
        }
        else {
            newUser.setAccountId(accountId);
            newUser.setOwner(false);
            userRepository.save(newUser);
            return newUser;
        }
    }

    public User getById(long userId) {
        return userRepository.findById(userId).orElse(null);
    }
}
