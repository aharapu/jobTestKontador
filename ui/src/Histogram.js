import React, { useState, useEffect } from 'react'

import { Group } from '@visx/group'
import { Bar } from '@visx/shape'
import { scaleLinear, scaleBand } from '@visx/scale'

const xMax = 500
const yMax = 500

const compose = (scale, accessor) => (data) => scale(accessor(data))

const Histogram = ({ data }) => {

    const x = (d) => d.month
    const y = (d) => d.postsNr

    const xScale = scaleBand({
        range: [0, xMax],
        round: true,
        domain: data.map(x),
        padding: 0.4,
    })
    const yScale = scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(y))],
    })

    if (data.length === 0)
        return <div>Loading...</div>

    return (
        <svg width={600} height={300}>
            {data.map((d, i) => {
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
