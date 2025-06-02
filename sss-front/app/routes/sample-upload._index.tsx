import type { MetaFunction } from 'react-router';
import SampleDropZone from '../components/SampleDropZone'

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

export default function SampleUpload() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div id="main">
                <SampleDropZone />
            </div>
        </div>
    )
}
