package com.finki.labs.lab2.model.dto;

import lombok.Data;

@Data
public class AuthorDto {

    private String name;
    private String surname;
    private Long country;

    public AuthorDto () {}

    public AuthorDto(String name,String surname,Long country) {
        this.name = name;
        this.surname = surname;
        this.country = country;
    }
}
