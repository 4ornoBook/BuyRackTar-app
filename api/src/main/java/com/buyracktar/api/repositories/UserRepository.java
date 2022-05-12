package com.buyracktar.api.repositories;

import com.buyracktar.api.entities.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    public Iterable<User> getByAccountId(Long accountId);
}
