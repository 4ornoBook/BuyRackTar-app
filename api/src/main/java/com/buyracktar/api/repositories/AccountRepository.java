package com.buyracktar.api.repositories;

import com.buyracktar.api.entities.Account;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface AccountRepository extends CrudRepository<Account, Long> {
    Account findByEmail(String email);

    @Transactional
    @Modifying
    @Query("update account a " +
    "set a.confirmed = true where a.email = ?1")
    int confirmedAccount(String email);
}
