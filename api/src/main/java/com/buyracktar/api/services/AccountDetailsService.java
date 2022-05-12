package com.buyracktar.api.services;

import com.buyracktar.api.entities.Account;
import com.buyracktar.api.repositories.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static java.lang.String.format;

@Service
@AllArgsConstructor
public class AccountDetailsService implements UserDetailsService {
	private final AccountRepository accountRepository;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Account account  = accountRepository.findByEmail(username);
		if(account == null) {
			throw new UsernameNotFoundException(format("User %s not found", username));
		}else {
			return account;
		}
	}

	public int activateAccount(String email) {
		return accountRepository.confirmedAccount(email);
	}
}