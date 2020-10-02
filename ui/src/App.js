import React, {useEffect, useState} from 'react'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'

import { letterFrequency } from '@visx/mock-data'

import Histogram from './Histogram'
import './App.css'

console.log('letterFrequency', letterFrequency)

const client = new ApolloClient({
    uri: 'https://fakerql.stephix.uk/graphql',
})

const testQuery = gql`
    {
        allPosts(count: 250) {
            createdAt
        }
    }
`

function App() {
	const [histogramData, setHistogramData] = useState([])

    useEffect(() => {
        client
            .query({
                query: testQuery,
            })
            .then((res) => {
                const postsArr = res.data.allPosts
                    .map((post) => new Date(parseInt(post.createdAt)))
					.filter((date) => date.getUTCFullYear() === 2019)
					.map( date => date.getMonth())
					.reduce((acc, val) => {
						acc[val] = acc[val] + 1
						return acc
					}, new Array(12).fill(0))
					.map( (postsNr, i) => ({ month: i, postsNr}))
				console.log('postsArr', postsArr)

				setHistogramData(postsArr)
            })
            .catch((err) => console.error(err))
    }, [])

    return (
        <ApolloProvider client={client}>
            <div className="App">
                <header className="App-header">Example Project</header>
                <div>
                    here's some data
                    <Histogram data={histogramData} />
                </div>
            </div>
        </ApolloProvider>
    )
}

export default App
