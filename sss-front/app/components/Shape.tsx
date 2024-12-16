interface ShapeProps {
    instrument: string
    width?: string | number
}

export default function Shape({ instrument, width = 200 }: ShapeProps) {
    return (
        <div className="shape mx-2">
            <img
                src={`/shapes/shape_${instrument}.svg`}
                alt={`${instrument} shape`}
                width={width}
            />
        </div>
    )
}
