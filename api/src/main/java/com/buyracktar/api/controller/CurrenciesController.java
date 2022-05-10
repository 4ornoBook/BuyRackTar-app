package com.buyracktar.api.controller;

import com.buyracktar.api.entity.Currency;
import com.buyracktar.api.repository.CurrencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CurrenciesController {

	@Autowired
	CurrencyRepository currencyRepository;

	@GetMapping("currencies")
	public Iterable<Currency> getCurrencies() {
		return currencyRepository.findAll();
	}
}
