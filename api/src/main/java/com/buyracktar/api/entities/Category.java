package com.buyracktar.api.entities;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private Long accountId;

	private String name;

	private BigDecimal moneyLimit;

	private Long currencyId;

	private String description;

	private boolean active;
}
