package com.buyracktar.api.repositories;

import com.buyracktar.api.entities.CategoryTransaction;
import com.buyracktar.api.entities.Wallet;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryTransactionRepository extends CrudRepository<CategoryTransaction, Long> {
    public Iterable<CategoryTransaction> findByCategoryId(Long categoryId);

    public Iterable<CategoryTransaction> findCategoryTransactionByWallet(Wallet wallet);


    @Query("select ct from CategoryTransaction as ct " +
            "inner join Wallet w on ct.wallet.id = w.id " +
            "where w.userId = 40")
    public Iterable<CategoryTransaction> findByUserId(long userId);
}
