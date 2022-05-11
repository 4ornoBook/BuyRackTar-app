package com.buyracktar.api.controllers;

import com.buyracktar.api.MyResponse;
import com.buyracktar.api.entities.Currency;
import com.buyracktar.api.repositories.CurrencyRepository;
import org.aspectj.weaver.Iterators;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CurrenciesController {

	@Autowired
	CurrencyRepository currencyRepository;

	@GetMapping("currencies")
	public MyResponse getCurrencies() {
		Iterable<Currency> currencies = currencyRepository.findAll();
		MyResponse myResponse = new MyResponse(true, currencies, null);
		return myResponse;
	}
}
