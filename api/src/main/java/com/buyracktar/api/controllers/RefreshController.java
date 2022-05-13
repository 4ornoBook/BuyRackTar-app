package com.buyracktar.api.controllers;

import com.buyracktar.api.responsemodels.MyResponseTemplate;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@AllArgsConstructor
public class RefreshController {

    @PostMapping("/auth/refresh")
    public ResponseEntity<Object> refreshToken() {
        return ResponseEntity.ok(new MyResponseTemplate(false,null, "create this controller"));
    }
}
