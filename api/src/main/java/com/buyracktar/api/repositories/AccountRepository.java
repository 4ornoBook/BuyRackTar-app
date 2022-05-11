package com.buyracktar.api.repositories;

import com.buyracktar.api.entities.Account;
import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account, Long> {
    Account findByEmail(String email);
}
