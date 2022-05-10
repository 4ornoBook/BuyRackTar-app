package com.buyracktar.api.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Account {
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
}
