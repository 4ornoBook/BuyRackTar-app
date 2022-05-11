package com.buyracktar.api.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Account implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String email;

	private String password;

	private boolean confirmed;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "account_id")
	private Set<User> users;

	public Account() {
		confirmed = false;
	}

	public Account(Long id, String email, String password, boolean confirmed) {
		this.id = id;
		this.email = email;
		this.password = password;
		this.confirmed = confirmed;
		users = new HashSet<>();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return confirmed;
	}
}
