import React from 'react'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'

import logo from './logo.svg'
import './App.css'

const client = new ApolloClient({
    uri: 'https://fakerql.stephix.uk/graphql',
})

const testQuery = gql`
    {
        allPosts(count: 3) {
            title
            body
        }
    }
`

client.query({
  query: testQuery
}).then( res => console.log(res))
.catch(err => console.error(err))

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        </ApolloProvider>
    )
}

export default App
