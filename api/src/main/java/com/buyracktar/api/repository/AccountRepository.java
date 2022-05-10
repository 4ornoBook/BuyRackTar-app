package com.buyracktar.api.repository;

import com.buyracktar.api.entity.Account;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AccountRepository extends CrudRepository<Account, Long> {
    Account findByEmail(String email);
}
