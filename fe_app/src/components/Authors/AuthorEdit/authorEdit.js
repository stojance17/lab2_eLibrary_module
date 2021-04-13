import React from 'react';
import {useHistory} from 'react-router-dom';

const AuthorEdit = (props)=> {
    const history = useHistory();
    const [formData,updateFormData] = React.useState({
        name:"",
        surname: "",
        country:1
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()

        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name !== "" ? formData.name : props.author.name;
        const surname = formData.surname !== "" ? formData.surname : props.author.surname;
        const country = formData.country !== 1 ? formData.country : props.author.country.id;
        props.onEditAuthor(props.author.id,name,surname,country);
        history.push("/authors");
    }

    return(
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">First name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               placeholder={props.author.name}
                               onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="surname">Surname</label>
                        <input type="text"
                               className="form-control"
                               id="surname"
                               name="surname"
                               placeholder={props.author.surname}
                               onChange={handleChange}
                        />
                    </div>



                    <div className="form-group">
                        <label>Country</label>
                        <select name="country" className="form-control" onChange={handleChange}>
                            {props.countries.map((term) => {
                                if(props.author.country !== undefined && props.author.country.id===term.id)
                                    return  <option selected={props.author.country.id} value={term.id}>{term.name}</option>
                                else return <option value={term.id}>{term.name}</option>
                                }

                            )}
                        </select>
                        <small id="countryhelp" class="form-text text-danger">If the country from where the author of the
                            book is, isn't in the list you can add it manualy from  <a href={"/countries/add"}>here</a>.</small>
                    </div>


                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )


}


export default AuthorEdit;