package com.buyracktar.api.repositories;

import com.buyracktar.api.entities.Wallet;
import com.buyracktar.api.entities.WalletTransaction;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletTransactionRepository extends CrudRepository<WalletTransaction, Long> {
    public Iterable<WalletTransaction> findByToWallet(Wallet toWallet);
    public Iterable<WalletTransaction> findByFromWallet(Wallet fromWallet);

//    @Query("UPDATE ConfirmationToken c " +
//            "SET c.confirmedAt = ?2 " +
//            "WHERE c.token = ?1")
//
   @Query("select wt from WalletTransaction as wt " +
           "inner join  Wallet w on wt.fromWallet.id = w.id " +
           "inner join Wallet w2 on wt.toWallet.id = w2.id " +
           "where w.userId = ?1 or w2.userId = ?1")
    public Iterable<WalletTransaction> findByUserId(long userId);
}
