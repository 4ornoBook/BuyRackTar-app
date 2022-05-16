package com.buyracktar.api.repositories;

import com.buyracktar.api.entities.CategoryTransaction;
import com.buyracktar.api.entities.Wallet;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryTransactionRepository extends CrudRepository<CategoryTransaction, Long> {
    public Iterable<CategoryTransaction> findByCategoryId(Long categoryId);

    public Iterable<CategoryTransaction> findCategoryTransactionByWallet(Wallet wallet);
}
