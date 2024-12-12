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

    console.log(state?.samples)

    return (
        <div className="flex flex-col font-mono text-sssdarkblue bg-sssoffwhite items-center justify-center min-h-screen">
            <SampleDataFill />
        </div>
    )
}
