interface ShapeProps {
    instrument: string
}

export default function Shape({ instrument }: ShapeProps) {
    return (
        <div className="shape mx-2">
            <img
                src={`/shapes/shape_${instrument}.svg`}
                alt={`${instrument} shape`}
                width="200px"
            />
        </div>
    )
}
