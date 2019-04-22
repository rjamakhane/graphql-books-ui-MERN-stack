import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import logo from './logo.svg';
import './App.css';

//components
import BookList from './components/booklist';
import AddBook from './components/addBook';

//setup apolloclient
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client} >
                <div id="main">
                    <h1>My Book List </h1>
                    <BookList />
                    <AddBook />
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
