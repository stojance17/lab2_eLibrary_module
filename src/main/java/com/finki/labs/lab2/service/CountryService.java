package com.finki.labs.lab2.service;

import com.finki.labs.lab2.model.Country;
import com.finki.labs.lab2.model.dto.CountryDto;

import java.util.List;
import java.util.Optional;

public interface CountryService {

    Optional<Country> findById(Long id);
    List<Country> findAll();
    Optional<Country> save(CountryDto countryDto);
    Optional<Country> edit(Long id,CountryDto countryDto);
    void deleteById(Long id);
}
