package com.buyracktar.api.controllers;

import com.buyracktar.api.entities.Category;
import com.buyracktar.api.repositories.CategoryRepository;
import com.buyracktar.api.responsemodels.MyResponseTemplate;
import com.buyracktar.api.services.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

@RestController
@RequestMapping(value = "/categories")
@AllArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<Object> getCategory(@PathVariable long id) {

        return ResponseEntity.ok(new MyResponseTemplate(false, null, "get by id is not ready"));
    }

    @PostMapping()
    public ResponseEntity<Object> addCategory(@RequestHeader String Authorization, @RequestBody Category category) {
        return ResponseEntity.ok(new MyResponseTemplate(true, categoryService.addCategory(Authorization, category), null));
    }

    @PostMapping(value = "/{id}")
    public ResponseEntity<Object> updateCategory() {
        return ResponseEntity.ok(new MyResponseTemplate(false, null, "update by id is no ready"));
    }
}
