package com.buyracktar.api.repositories;

import com.buyracktar.api.entities.CategoryTransaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryTransactionRepository extends CrudRepository<CategoryTransaction, Long> {
}
