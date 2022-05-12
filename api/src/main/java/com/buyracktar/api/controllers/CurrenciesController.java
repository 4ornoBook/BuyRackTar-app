package com.buyracktar.api.controllers;

import com.buyracktar.api.responsemodels.MyResponseTemplate;
import com.buyracktar.api.entities.Currency;
import com.buyracktar.api.repositories.CurrencyRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class CurrenciesController {

	private final CurrencyRepository currencyRepository;

	@GetMapping("currencies")
	public ResponseEntity<Object> getCurrencies() {
		Iterable<Currency> currencies = currencyRepository.findAll();
		return ResponseEntity.ok(new MyResponseTemplate(true, currencies, null));
	}
}
