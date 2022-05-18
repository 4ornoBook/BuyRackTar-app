package com.buyracktar.api.repositories;

import com.buyracktar.api.entities.Category;
import com.buyracktar.api.entities.CategorySpendings;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long> {
    Iterable<Category> findByAccountId(Long accountId);

    @Query("select new com.buyracktar.api.entities.CategorySpendings(c.id, sum(ct.amount)) from CategoryTransaction as ct "+
            "inner join Category c on ct.category.id = c.id where c.accountId = :accountId "+
            "group by c.id")
    Iterable<CategorySpendings> getSpendingsByAccount(long accountId);
}
