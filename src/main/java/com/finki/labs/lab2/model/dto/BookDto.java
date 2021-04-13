package com.finki.labs.lab2.model.dto;


import lombok.Data;

@Data
public class BookDto {

    private String name;
    private int category;
    private Long author;
    private int availableCopies;

    public BookDto(){}

    public BookDto(String name,int category,Long author,int availableCopies) {
        this.name = name;
        this.category = category;
        this.author = author;
        this. availableCopies = availableCopies;
    }


}
