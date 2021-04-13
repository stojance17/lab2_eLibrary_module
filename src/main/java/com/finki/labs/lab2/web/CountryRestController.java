package com.finki.labs.lab2.web;

import com.finki.labs.lab2.model.Country;
import com.finki.labs.lab2.model.dto.CountryDto;
import com.finki.labs.lab2.service.CountryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/countries")
public class CountryRestController {

    private final CountryService service;

    public CountryRestController(CountryService service) {
        this.service = service;
    }

    @GetMapping
    public List<Country> findAll() {
        return this.service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Country> findById(@PathVariable Long id) {
        return this.service.findById(id).
                map(country -> ResponseEntity.ok().body(country))
                .orElseGet(()->ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Country> create(@RequestBody CountryDto countryDto) {
        return this.service.save(countryDto)
                .map(country -> ResponseEntity.ok().body(country))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }


    @PutMapping("/{id}/edit")
    public ResponseEntity<Country> edit(@PathVariable Long id,@RequestBody CountryDto countryDto) {
        return this.service.edit(id,countryDto)
                .map(country -> ResponseEntity.ok().body(country))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteById(@PathVariable Long id){
        this.service.deleteById(id);
        if(this.service.findById(id).isEmpty()) return ResponseEntity.ok().body("Item Deleted");
        return ResponseEntity.badRequest().body("Something went wrong");


    }

}
