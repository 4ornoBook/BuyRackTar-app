package com.buyracktar.api.repositories;

import com.buyracktar.api.entities.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long> {
    Iterable<Category> findByAccountId(Long accountId);
}
