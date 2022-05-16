package com.buyracktar.api.repositories;

import com.buyracktar.api.entities.Wallet;
import com.buyracktar.api.entities.WalletTransaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletTransactionRepository extends CrudRepository<WalletTransaction, Long> {
    public Iterable<WalletTransaction> findByToWallet(Wallet toWallet);
}
