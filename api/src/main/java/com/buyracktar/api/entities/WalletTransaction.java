package com.buyracktar.api.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WalletTransaction {

    private Long id;

    @ManyToOne()
    @JoinColumn(name = "from_wallet_id")
    private Wallet fromWallet;

    @ManyToOne()
    @JoinColumn(name = "to_wallet_id")
    private Wallet toWallet;

    private String name;

    private BigDecimal amount;

    private LocalDateTime time;

    private String description;
}
