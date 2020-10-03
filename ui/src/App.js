import React from 'react'

import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'

import Histogram from './components/Histogram'
import './App.css'

const client = new ApolloClient({
    uri: 'https://fakerql.stephix.uk/graphql',
	cache: new InMemoryCache()
  })

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <header className="App-header">Example Project</header>
                <div>
                    <Histogram />
                </div>
            </div>
        </ApolloProvider>
    )
}

export default App
