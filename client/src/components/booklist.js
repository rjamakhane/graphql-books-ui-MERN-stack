import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

//queries
import { getBooksQuery } from '../queries/queries';

//components
import BookDetails from './bookDetails';

class BookList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected : null
        }
    }
    fetchBooks() {
        if (this.props.data.loading) {
            return <div>Loading Books ....</div>;
        } else {
            return this.props.data.books.map((book) => {
                return <li key={book.id} onClick={(e) => { this.setState({ selected: book.id }) }}>{book.name}</li>
            })
        }
    }
    render() {
        return (
            <div>
                <ul id="book-list">
                    {this.fetchBooks()}
                </ul>
                <BookDetails bookid={this.state.selected} />
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
