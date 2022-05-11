package com.buyracktar.api.repositories;

import com.buyracktar.api.entities.Currency;
import org.springframework.data.repository.CrudRepository;

public interface CurrencyRepository extends CrudRepository<Currency, Long> {

}
