package com.buyracktar.api.services;


import com.buyracktar.api.entities.Account;
import com.buyracktar.api.entities.Category;
import com.buyracktar.api.repositories.AccountRepository;
import com.buyracktar.api.repositories.CategoryRepository;
import com.buyracktar.api.security.jwtutils.TokenManager;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedList;

@Service
@AllArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final AccountRepository accountRepository;
    private final TokenManager tokenManager;

    public Iterable<Category> getByAccount(String authorization) {
        String token = authorization.replace("Bearer ","");
        Account account = accountRepository.findByEmail(tokenManager.getUsernameFromToken(token));
        return categoryRepository.findByAccountId(account.getId());
    }

    public Category addCategory(String authorization, Category category) {
        String token = authorization.replace("Bearer ","");
        Account account = accountRepository.findByEmail(tokenManager.getUsernameFromToken(token));
        category.setAccountId(account.getId());
        return categoryRepository.save(category);
    }

}
