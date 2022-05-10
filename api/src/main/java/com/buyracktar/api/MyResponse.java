package com.buyracktar.api;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
//@AllArgsConstructor
public class MyResponse {
    boolean success;
    Object[] data;

    public MyResponse(boolean success, Object... args) {
        this.success=success;
        this.data = args;
    }
}
