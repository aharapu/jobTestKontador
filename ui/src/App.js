import React from 'react'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'

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
					Example Project
                </header>
				<div>
					here's some data
				</div>
            </div>
        </ApolloProvider>
    )
}

export default App
