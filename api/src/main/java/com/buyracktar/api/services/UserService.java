package com.buyracktar.api.services;

import com.buyracktar.api.entities.User;
import com.buyracktar.api.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Iterable<User> getUsers(Long accountId) {
        return userRepository.getByAccountId(accountId);
    }
}
