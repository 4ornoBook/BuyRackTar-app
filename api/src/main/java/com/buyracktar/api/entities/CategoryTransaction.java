package com.buyracktar.api.entities;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@JsonPropertyOrder({"id", "wallet", "category", "amount", "time", "description"})
public class CategoryTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "wallet_id")
    private Wallet wallet;

    @ManyToOne()
    @JoinColumn(name = "category_id")
    @JsonIgnore
    private Category category;

    private BigDecimal amount;

    @JsonIgnore
    private LocalDateTime time;

    private String description;

    @JsonGetter("time")
    public long getTime() {
        return Timestamp.valueOf(time).getTime();
    }

    @JsonGetter("category")
    public Map<String, String> getJsonCategory() {
        Map<String, String> categoryMap = new HashMap<>();
        categoryMap.put("id", category.getId()+"");
        categoryMap.put("name", category.getName());
        return categoryMap;
    }
}
