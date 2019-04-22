import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

//queries
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    displayAuthors() {
        console.log(this.props);
        if (this.props.getAuthorsQuery.loading) {
            return <option disabled>Loading authors...</option>;
        }
        else {
            return this.props.getAuthorsQuery.authors.map((author) => {
                return <option key={author.id} value={author.id}>{author.name}</option>
            })
        }
    }
    submitForm = (e) => {
        e.preventDefault()
        this.props.addBookMutation({
            variables : {
                name : this.state.name,
                genre : this.state.genre,
                authorId :this.state.authorId
            },
            refetchQueries : [
                {
                    query : getBooksQuery
                }
            ]
        })
    }
    render() {
        return (
            <div>
                <form id="add-book" onSubmit={this.submitForm}>
                    <div className="field">
                        <label>Book name:</label>
                        <input type="text" value={this.state.name} name="name" onChange={this.handleChange} />
                    </div>
                    <div className="field">
                        <label>Genre:</label>
                        <input type="text" value={this.state.genre} name="genre" onChange={this.handleChange} />
                    </div>
                    <div className="field">
                        <label>Author:</label>
                        <select value={this.state.authorId} name="authorId" onChange={this.handleChange}>
                            <option>Select author</option>
                            {this.displayAuthors()}
                        </select>
                    </div>
                    <button>+</button>

                </form>
            </div>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
