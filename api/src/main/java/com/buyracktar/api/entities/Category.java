package com.buyracktar.api.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private Long accountId;

	private String name;
	@JsonProperty("limit")
	private BigDecimal moneyLimit;

	private Long currencyId;

	private String description;

	private boolean active;
}
