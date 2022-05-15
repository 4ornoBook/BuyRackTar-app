package com.buyracktar.api.security.jwtutils.models;

import lombok.ToString;

import java.io.Serializable;

@ToString
public class LoginRequestModel implements Serializable {
	private static final long serialVersionUID = 2636936156391265891L;
	private String email;
	private String password;

	private Long id;
	public LoginRequestModel() {
	}
	public LoginRequestModel(String email, String password, Long id) {
		super();
		this.email = email; this.password = password;
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
