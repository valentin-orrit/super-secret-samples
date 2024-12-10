import { useState } from 'react'

export default function Shape() {
    const [instrument, setInstrument] = useState('synths')

    return (
        <div className="shape">
            <img
                src={`/shapes/shape_${instrument}.svg`}
                alt="arps logo"
                width="200px"
            />
        </div>
    )
}
