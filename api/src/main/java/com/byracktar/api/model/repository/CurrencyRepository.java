package com.byracktar.api.model.repository;

import com.byracktar.api.model.entity.Currency;
import org.springframework.data.repository.CrudRepository;

public interface CurrencyRepository extends CrudRepository<Currency, Long> {

}
