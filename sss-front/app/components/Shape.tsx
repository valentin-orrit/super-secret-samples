interface ShapeProps {
    instrument?: string
    width?: number
}

export default function Shape({
    instrument = 'bass',
    width = 200,
}: ShapeProps) {
    return (
        <div className="shape mx-2">
            <img
                src={`/shapes/shape_${instrument}.svg`}
                alt={`${instrument} shape logo`}
                width={width}
            />
        </div>
    )
}
