import React from 'react'
import { useQuery, gql } from '@apollo/client'

import { Group } from '@visx/group'
import { Bar } from '@visx/shape'
import { scaleLinear, scaleBand } from '@visx/scale'

const GET_POSTS = gql`
    query GetPosts {
        allPosts(count: 250) {
            createdAt
        }
    }
`

const xMax = 500
const yMax = 500

const compose = (scale, accessor) => (data) => scale(accessor(data))

const Histogram = () => {
    const { loading, error, data } = useQuery(GET_POSTS)

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error occured</div>

    const histData = data.allPosts
        .map((post) => new Date(parseInt(post.createdAt)))
        .filter((date) => date.getUTCFullYear() === 2019)
        .map((date) => date.getMonth())
        .reduce((acc, val) => {
            acc[val] = acc[val] + 1
            return acc
        }, new Array(12).fill(0))
        .map((postsNr, i) => ({ month: i, postsNr }))

    const x = (d) => d.month
    const y = (d) => d.postsNr

    const xScale = scaleBand({
        range: [0, xMax],
        round: true,
        domain: histData.map(x),
        padding: 0.4,
    })
    const yScale = scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...histData.map(y))],
    })

    return (
        <svg width={600} height={300}>
            {histData.map((d, i) => {
                const barHeight = yMax - compose(yScale, y)(d)
                return (
                    <Group key={`bar-${i}`}>
                        <Bar
                            x={compose(xScale, x)(d)}
                            y={yMax - barHeight}
                            height={barHeight}
                            width={xScale.bandwidth()}
                            fill="#fc2e1c"
                        />
                    </Group>
                )
            })}
        </svg>
    )
}

export default Histogram
