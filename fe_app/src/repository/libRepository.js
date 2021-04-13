import axios from "../custom-axios/axios";

const LibService = {

    fetchCountries: () => {
        return axios.get("/countries")
    },
    fetchAuthors: () => {
        return axios.get("/authors")
    },
    fetchBooks: () => {
        return axios.get("/books")
    },
    getCountry: (id) => {
        return axios.get(`/countries/${id}`)
    },
    addCountry: (name,continent) => {
        return axios.post("/countries/add",
            {
                "name":name,
                "continent":continent
            });
    },
    editCountry: (id,name,continent) => {
        return axios.put(`/countries/${id}/edit` , {
            "name":name,
            "continent":continent
        });
    },
    deleteCountry: (id) => {
        return axios.delete(`/countries/${id}/delete`)
    },

    getAuthor: (id) => {
        return axios.get(`/authors/${id}`)
    },

    addAuthor: (name,surname,country) => {
      return axios.post("/authors/add",{
          "name":name,
          "surname":surname,
          "country":country
      });
    },

    editAuthor: (id,name,surname,country) => {
        return axios.put(`/authors/${id}/edit`,{
            "name":name,
            "surname":surname,
            "country":country
        });
    },

    deleteAuthor: (id) => {
        return axios.delete(`/authors/${id}/delete`);
    },

    getBook: (id) => {
        return axios.get(`/books/${id}`)
    },

    addBook: (name,category,author,availableCopies) => {
        return axios.post("/books/add",{
            "name":name,
            "category":category,
            "author":author,
            "availableCopies":availableCopies
        })
    },

    editBook: (id,name,category,author,availableCopies) => {
        return axios.put(`/books/${id}/edit`,{
            "name":name,
            "category":category,
            "author":author,
            "availableCopies":availableCopies
        });
    },

    deleteBook: (id) => {
        return axios.delete(`/books/${id}/delete`)
    },

    decreaseBookQuantity: (id) => {
        return axios.post(`books/${id}/decrease`)
    }

}

export default LibService;