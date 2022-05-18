package com.buyracktar.api.services;

import com.buyracktar.api.entities.Account;
import com.buyracktar.api.entities.User;
import com.buyracktar.api.repositories.AccountRepository;
import com.buyracktar.api.repositories.UserRepository;
import com.buyracktar.api.security.jwtutils.TokenManager;
import lombok.AllArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AccountService accountService;

    private final TokenManager tokenManager;

    public Iterable<User> getUsers(Long accountId) {
        return userRepository.getByAccountId(accountId);
    }

    public User addNewUser(String token, User newUser) {
        token = token.replace("Bearer ","");
        String email = tokenManager.getUsernameFromToken(token);
        Account account =  accountService.getAccountByMail(email);
        if(account == null) {
            return null;
        }
        else {
            newUser.setAccountId(account.getId());
            newUser.setOwner(false);
            userRepository.save(newUser);
            return newUser;
        }
    }

    public User getById(long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public User updateUser(long userId, User upUser) {
        User user = userRepository.findById(userId).orElse(null);
        if(user == null || upUser == null) {
            return null;
        } else {
            user.setName(upUser.getName());
            userRepository.save(user);
            return user;
        }
    }
}
