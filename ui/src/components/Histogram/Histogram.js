import React from 'react'
import { useQuery, gql } from '@apollo/client'

import { Group } from '@visx/group'
import { Bar } from '@visx/shape'
import { scaleLinear, scaleBand } from '@visx/scale'
import { AxisLeft, AxisBottom } from '@visx/axis'

const GET_POSTS = gql`
    query GetPosts {
        allPosts(count: 250) {
            createdAt
        }
    }
`

const width = 750
const height = 400

const margin = {
    top: 60,
    bottom: 100,
    left: 80,
    right: 80,
}

const xMax = width - margin.left - margin.right
const yMax = height - margin.top - margin.bottom

const x = (d) => d.month
const y = (d) => d.postsNr

const compose = (scale, accessor) => (data) => scale(accessor(data))

const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

const tickLabelProps = () =>
  ({
    fill: '#0a0a0a',
    fontSize: 16,
    fontWeight: 600,
    fontFamily: 'Segoe UI',
    textAnchor: 'middle',
  })

  const bottomLabelProps = {
    fill: '#0a0a0a',
    fontSize: 22,
    fontWeight: 600,
    fontFamily: 'Segoe UI',
    textAnchor: 'middle',
  }

  const leftLabelProps = {
      ...bottomLabelProps,
      fontSize: 18
  }

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
        .map((postsNr, i) => ({ month: monthNames[i], postsNr }))

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
        <svg width={width} height={height}>
            <Group top={margin.top} left={margin.left}>
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
                <AxisLeft
                    scale={yScale}
                    top={0}
                    left={0}
                    label={'Nr. of Posts'}
                    labelOffset={20}
                    labelProps={leftLabelProps}
                    stroke={'#1b1a1e'}
                    strokeWidth={3}
                    tickTextFill={'#1b1a1e'}
                />
                <AxisBottom
                    scale={xScale}
                    top={yMax}
                    label={'Posts By Month'}
                    labelOffset={20}
                    labelProps={bottomLabelProps}
                    stroke={'#1b1a1e'}
                    strokeWidth={5}
                    tickTextFill={'#1b1a1e'}
                    tickClassName={'tickClass'}
                    tickLabelProps={tickLabelProps}
                />
            </Group>
        </svg>
    )
}

export default Histogram
