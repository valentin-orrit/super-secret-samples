import type { MetaFunction } from '@remix-run/node'
import { useLocation } from '@remix-run/react'
import { FileWithPath } from 'react-dropzone-esm'
import SampleDataFill from '../components/SampleDataFill'

interface LocationState {
    samples: FileWithPath[]
}

export const meta: MetaFunction = () => {
    return [
        { title: 'upload samples - super secret samples' },
        {
            name: 'description',
            content:
                'upload samples to be reviewed and displayed in the samples page!',
        },
    ]
}

export default function FillSampleData() {
    const location = useLocation()
    const state = location.state as LocationState
    const samples = state?.samples

    return (
        <div className="flex flex-col items-center justify-center min-w-screen min-h-screen">
            <SampleDataFill samples={samples} />
        </div>
    )
}
