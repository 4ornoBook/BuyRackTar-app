package com.buyracktar.api.repository;

import com.buyracktar.api.entity.Account;
import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account, Long> {
}
