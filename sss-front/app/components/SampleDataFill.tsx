import { FileWithPath } from 'react-dropzone-esm'

interface Samples {
    samples: FileWithPath[]
}

export default function SampleDataFill({ samples }: Samples) {
    console.log(samples)
    return (
        <div
            id="sample-data-fill"
            className="min-w-1/2 flex flex-col bg-white p-14 rounded-xl"
        >
            <h1>samples here</h1>
        </div>
    )
}
