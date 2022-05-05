package com.byracktar.api.controller;

import com.byracktar.api.model.entity.Currency;
import com.byracktar.api.model.repository.CurrencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CurrenciesController {

	@Autowired
	CurrencyRepository currencyRepository;

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("currencies")
	public Iterable<Currency> getCurrencies() {
		return currencyRepository.findAll();
	}
}
