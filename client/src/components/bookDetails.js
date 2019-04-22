import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {
    displayBook() {
        const { book } = this.props.data;
        if (book) {
            return (
                <div>
                    <div><strong>Name :</strong>{book.name}</div>
                    <div><strong>Genre :</strong>{book.genre}</div>
                    <div><strong>Author Name :</strong>{book.author.name}</div>
                    <h2>Other books of this author</h2>
                    <ul id="all-books">
                        {
                            book.author.books && book.author.books.map(bookObj => {
                                return <li key={bookObj.id}>{bookObj.name}</li>
                            })
                        }
                        <li></li>
                    </ul>
                </div>
            )
        }
        else {
            return (
                <div> No Book Found </div>
            )
        }
    }
    render() {
        console.log(this.props);
        return (
            <div id="book-details">
                <h1>Book Details Section</h1>
                {this.displayBook()}
            </div>
        );
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookid
            }
        }
    }
})(BookDetails);
