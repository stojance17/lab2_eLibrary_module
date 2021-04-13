package com.finki.labs.lab2.service;

import com.finki.labs.lab2.model.Author;
import com.finki.labs.lab2.model.dto.AuthorDto;

import java.util.List;
import java.util.Optional;

public interface AuthorService {

    Optional<Author> findById(Long id);
    List<Author> findAll();
    Optional<Author> create(AuthorDto authorDto);
    Optional<Author> edit(Long id,AuthorDto authorDto);
    void deleteById(Long id);

}
