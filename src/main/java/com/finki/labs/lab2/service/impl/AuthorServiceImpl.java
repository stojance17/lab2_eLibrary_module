package com.finki.labs.lab2.service.impl;

import com.finki.labs.lab2.model.Author;
import com.finki.labs.lab2.model.Country;
import com.finki.labs.lab2.model.dto.AuthorDto;
import com.finki.labs.lab2.model.exceptions.AuthorNotFoundException;
import com.finki.labs.lab2.model.exceptions.CountryNotFoundException;
import com.finki.labs.lab2.repository.AuthorRepository;
import com.finki.labs.lab2.repository.CountryRepository;
import com.finki.labs.lab2.service.AuthorService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorServiceImpl implements AuthorService {

    private final AuthorRepository authorRepository;
    private final CountryRepository countryRepository;

    public AuthorServiceImpl(AuthorRepository authorRepository, CountryRepository countryRepository) {
        this.authorRepository = authorRepository;
        this.countryRepository = countryRepository;
    }

    @Override
    public Optional<Author> findById(Long id) {
        return this.authorRepository.findById(id);
    }

    @Override
    public List<Author> findAll() {
        return this.authorRepository.findAll();
    }

    @Override
    public Optional<Author> create(AuthorDto authorDto) {
        Country country = this.countryRepository.findById(authorDto.getCountry())
                .orElseThrow(()-> new CountryNotFoundException(authorDto.getCountry()));
        Author author = new Author(authorDto.getName(), authorDto.getSurname(),country);
        return Optional.of(this.authorRepository.save(author));
    }

    @Override
    public Optional<Author> edit(Long id, AuthorDto authorDto) {
        Author author = this.authorRepository.findById(id)
                .orElseThrow(()-> new AuthorNotFoundException(id));
        Country country = this.countryRepository.findById(authorDto.getCountry())
                .orElseThrow(()-> new CountryNotFoundException(authorDto.getCountry()));
        author.setName(authorDto.getName());
        author.setSurname(authorDto.getSurname());
        author.setCountry(country);
        return Optional.of(this.authorRepository.save(author));
    }

    @Override
    public void deleteById(Long id) {
        this.authorRepository.deleteById(id);
    }
}
