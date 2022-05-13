package com.buyracktar.api.repositories;

import com.buyracktar.api.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    public Iterable<User> getByAccountId(Long accountId);
}
