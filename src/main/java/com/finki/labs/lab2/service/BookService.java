package com.finki.labs.lab2.service;

import com.finki.labs.lab2.model.Book;
import com.finki.labs.lab2.model.dto.BookDto;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface BookService {

    Optional<Book> findById(Long id);
    List<Book> findAll();
    Optional<Book> create(BookDto bookDto);
    Optional<Book> edit(Long id,BookDto bookDto);
    void deleteById(Long id);
    boolean decreaseAvailableCopies(Long id);

}
