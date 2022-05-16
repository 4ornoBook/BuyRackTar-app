package com.buyracktar.api.entities;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
public class WalletTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "from_wallet_id")
    private Wallet fromWallet;

    @ManyToOne()
    @JoinColumn(name = "to_wallet_id")
    private Wallet toWallet;

    private String name;

    private BigDecimal amount;

    @JsonIgnore
    private LocalDateTime time;

    private String description;

    @JsonGetter("time")
    public long getTime() {
        return Timestamp.valueOf(time).getTime();
    }
}
