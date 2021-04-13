import logo from '../../logo.svg';
import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import Countries from "../Countries/CountriesList/countries";
import Header from '../Header/header';
import CountryAdd from "../Countries/CountryAdd/countryAdd";
import CountryEdit from "../Countries/CountryEdit/countryEdit";
import LibService from "../../repository/libRepository";
import Categories from "../Categories/categories";
import Authors from "../Authors/AuthorsList/authors"
import AuthorAdd from "../Authors/AuthorAdd/authorAdd";
import AuthorEdit from "../Authors/AuthorEdit/authorEdit";
import Books from "../Books/BooksList/books";
import BookAdd from "../Books/BookAdd/addBook";
import BookEdit from "../Books/BookEdit/bookEdit";

class App extends Component {

    constructor(props) {
        super(props);
        this.state={
            countries:[],
            authors:[],
            books:[],
            selectedCountry:{},
            selectedAuthor:{},
            selectedBook:{},

        }
    }

    render() {
        return(
            <Router>
                <Header/>
                <main>
                    <div className="container">

                        <Route path={"/books/:id/edit"} exact render={()=>
                            <BookEdit authors={this.state.authors}
                                      book={this.state.selectedBook}
                                      onEditBook={this.editBook}/>
                        }/>

                        <Route path={"/books/add"} exact render={()=>
                            <BookAdd authors={this.state.authors}
                            onAddBook={this.addBook}/>
                        }/>

                        <Route path={"/books"} exact render={()=>

                            <Books books = {this.state.books}
                                onEdit={this.getBook}
                                onDelete={this.deleteBook}
                                onMarkTaken={this.markBook}/>
                        }/>

                        <Route path={"/authors/:id/edit"} exact render={() =>
                            <AuthorEdit onEditAuthor={this.editAuthor}
                                        countries={this.state.countries}
                                         author={this.state.selectedAuthor}/>}/>

                        <Route path={"/authors/add"} exact render={()=>
                            <AuthorAdd countries={this.state.countries}
                                       onAddAuthor={this.addAuthor}/>
                        }/>

                        <Route path={"/authors"} exact render={()=>
                            <Authors authors={this.state.authors}
                            onEdit={this.getAuthor}
                            onDelete={this.deleteAuthor}/>
                        }/>

                        <Route path={"/categories"} exact render={()=>
                            <Categories />
                        }/>

                        <Route path={"/countries/add"} exact render={() =>
                            <CountryAdd onAddCountry={this.addCountry}/>}/>

                        <Route path={"/countries/:id/edit"} exact render={() =>
                            <CountryEdit onEditCountry={this.editCountry}
                                         country={this.state.selectedCountry}/>}/>



                        <Route path={"/countries"} exact render={() =>
                            <Countries countries={this.state.countries}
                             onDelete={this.deleteCountry}
                             onEdit = {this.getCountry}
                            />}/>

                    </div>
                </main>
            </Router>

        )
    }

    componentDidMount() {
        this.loadCountries();
        this.loadAuthors();
        this.loadBooks();

    }

    loadCountries = () => {
        LibService.fetchCountries()
            .then((data)=>{
                this.setState({
                    countries:data.data
                })
            });
    }

    loadAuthors = () => {
        LibService.fetchAuthors()
            .then((data)=>{
                this.setState({
                    authors:data.data
                })
            })
    }

    deleteCountry = (id) => {
        LibService.deleteCountry(id)
            .then(()=>{
                this.loadCountries();
            });
    }

    editCountry = (id,name,continent) => {
        LibService.editCountry(id, name, continent)
            .then(()=> {
                this.loadCountries();
            })
    }

    getCountry = (id) => {
        LibService.getCountry(id)
            .then((data)=>{
                this.setState({selectedCountry:data.data})
            })
    }

    addCountry = (name,continent) => {
        LibService.addCountry(name,continent)
            .then(()=>{
                this.loadCountries();
            })
    }

    getAuthor = (id) => {
        LibService.getAuthor(id)
            .then((data)=>{
                this.setState({
                    selectedAuthor:data.data
                })
            })
    }

    deleteAuthor = (id) => {
        LibService.deleteAuthor(id)
            .then(()=>{
                this.loadAuthors()
            })
    }

    editAuthor = (id,name,surname,country) => {
        LibService.editAuthor(id,name,surname,country)
            .then(()=>{
                this.loadAuthors();
            })
    }

    addAuthor = (name,surname,country) => {
        LibService.addAuthor(name,surname,country)
            .then(()=>this.loadAuthors())
    }

    loadBooks = () => {
        LibService.fetchBooks()
            .then((data)=>{
                console.log(data.data)
                this.setState({
                    books:data.data
                })
            })
    }

    getBook = (id) => {
        LibService.getBook(id)
            .then((data)=> {
                this.setState({
                    selectedBook:data.data
                })
            })
    }

    addBook = (name,category,author,availableCopies) => {
        LibService.addBook(name,category,author,availableCopies)
            .then(()=>{
                this.loadBooks()
            })
    }

    editBook = (id,name,category,author,availableCopies) => {
        LibService.editBook(id,name,category,author,availableCopies)
            .then(()=>{
                this.loadBooks();
            })
    }

    deleteBook = (id) => {
        LibService.deleteBook(id).then(()=>{
            this.loadBooks();
        })
    }

    markBook = (id) => {
        LibService.decreaseBookQuantity(id).then((data)=>{
            console.log(data.data)
            alert(data.data)
            this.loadBooks();
        })
    }


}

export default App;
