package com.buyracktar.api.services;


import com.buyracktar.api.entities.Account;
import com.buyracktar.api.entities.Category;
import com.buyracktar.api.entities.CategorySpendings;
import com.buyracktar.api.repositories.AccountRepository;
import com.buyracktar.api.repositories.CategoryRepository;
import com.buyracktar.api.security.jwtutils.TokenManager;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final AccountRepository accountRepository;
    private final TokenManager tokenManager;

    public Iterable<Category> getByAccount(String authorization) {
        Account account = getAccountFromHeader(authorization);
        return categoryRepository.findByAccountId(account.getId());
    }

    public Category addCategory(String authorization, Category category) {
        Account account = getAccountFromHeader(authorization);
        category.setAccountId(account.getId());
        return categoryRepository.save(category);
    }

    public Category updateCategory(long id, String authorization, Category category) {
        Account account = getAccountFromHeader(authorization);
        category.setAccountId(account.getId());
        category.setId(id);
        return categoryRepository.save(category);
    }

    public Optional<Category> getCategoryById(long id) {
        return categoryRepository.findById(id);
    }

    public Account getAccountFromHeader(String authorization) {
        String token = authorization.replace("Bearer ","");
        return accountRepository.findByEmail(tokenManager.getUsernameFromToken(token));
    }

    public  Iterable<CategorySpendings> getCategoriesSpendings(String authentication) {
        String email = tokenManager.getUsernameFromToken(authentication.replace("Bearer ",""));
        Account account = accountRepository.findByEmail(email);
        if(account == null) {
            return null;
        }else {
            Iterable<CategorySpendings> spends = categoryRepository.getSpendingsByAccount(account.getId());
            return spends;
        }
    }
}
