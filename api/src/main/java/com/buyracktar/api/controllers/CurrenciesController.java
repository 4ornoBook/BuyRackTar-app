package com.buyracktar.api.controllers;

import com.buyracktar.api.responsemodels.MyResponseTemplate;
import com.buyracktar.api.entities.Currency;
import com.buyracktar.api.repositories.CurrencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CurrenciesController {

	@Autowired
	CurrencyRepository currencyRepository;

	@GetMapping("currencies")
	public MyResponseTemplate getCurrencies() {
		Iterable<Currency> currencies = currencyRepository.findAll();
		MyResponseTemplate myResponse = new MyResponseTemplate(true, currencies, null);
		return myResponse;
	}
}
