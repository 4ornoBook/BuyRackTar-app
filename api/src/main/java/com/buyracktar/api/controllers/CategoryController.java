package com.buyracktar.api.controllers;

import com.buyracktar.api.entities.Category;
import com.buyracktar.api.responsemodels.MyResponseTemplate;
import com.buyracktar.api.services.CategoryService;
import com.buyracktar.api.services.CategoryTransactionService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/categories")
@AllArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final CategoryTransactionService transactionService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<Object> getCategory(@PathVariable long id) {
        Category category = categoryService.getCategoryById(id).orElse(null);
        if(category != null){
            return ResponseEntity.ok(new MyResponseTemplate(true, category, null));
        }
        else {
            return ResponseEntity.ok(new MyResponseTemplate(false, null, "get by id is not ready"));
        }
    }

    @PostMapping()
    public ResponseEntity<Object> addCategory(@RequestHeader String Authorization, @RequestBody Category category) {
        return ResponseEntity.ok(new MyResponseTemplate(true, categoryService.addCategory(Authorization, category), null));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Object> updateCategory(@PathVariable long id, @RequestHeader String Authorization, @RequestBody Category category) {
        return ResponseEntity.ok(new MyResponseTemplate(true, categoryService.updateCategory(id, Authorization, category), null));
    }

    @GetMapping(value = "/{id}/transactions")
    public ResponseEntity<Object> getCategoryTransactions(@PathVariable long id) {
        return ResponseEntity.ok(new MyResponseTemplate(true, transactionService.getTransactionsByCategory(id), null));
    }
}
