package com.finki.labs.lab2.service.impl;

import com.finki.labs.lab2.model.Author;
import com.finki.labs.lab2.model.Book;
import com.finki.labs.lab2.model.Category;
import com.finki.labs.lab2.model.dto.BookDto;
import com.finki.labs.lab2.model.exceptions.AuthorNotFoundException;
import com.finki.labs.lab2.model.exceptions.BookNotFoundException;
import com.finki.labs.lab2.repository.AuthorRepository;
import com.finki.labs.lab2.repository.BookRepository;
import com.finki.labs.lab2.service.BookService;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;

    public BookServiceImpl(BookRepository bookRepository, AuthorRepository authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }

    @Override
    public Optional<Book> findById(Long id) {
        return this.bookRepository.findById(id);
    }

    @Override
    public List<Book> findAll() {
        return this.bookRepository.findAll().stream().sorted(Comparator.comparing(Book::getId)).collect(Collectors.toList());
    }

    @Override
    public Optional<Book> create(BookDto bookDto) {
        Author author = this.authorRepository.findById(bookDto.getAuthor()).
                orElseThrow(()->new AuthorNotFoundException(bookDto.getAuthor()));
        Category category = Category.values()[bookDto.getCategory()];
        Book book = new Book(bookDto.getName(), category,author, bookDto.getAvailableCopies());
        return Optional.of(this.bookRepository.save(book));

    }

    @Override
    public Optional<Book> edit(Long id, BookDto bookDto) {
        Book book = this.bookRepository.findById(id).orElseThrow(()->new BookNotFoundException(id));
        Author author = this.authorRepository.findById(bookDto.getAuthor()).
                orElseThrow(()->new AuthorNotFoundException(bookDto.getAuthor()));
        Category category = Category.values()[bookDto.getCategory()];
        book.setName(bookDto.getName());
        book.setCategory(category);
        book.setAuthor(author);
        book.setAvailableCopies(bookDto.getAvailableCopies());
        return Optional.of(this.bookRepository.save(book));

    }

    @Override
    public void deleteById(Long id) {
        this.bookRepository.deleteById(id);
    }

    @Override
    public boolean decreaseAvailableCopies(Long id) {
       Book book = this.bookRepository.findById(id).orElseThrow(()-> new BookNotFoundException(id));
       if(book.getAvailableCopies()>0) {
           book.setAvailableCopies(book.getAvailableCopies()-1);
           this.bookRepository.save(book);
           return true;
       }
       return false;
    }
}
