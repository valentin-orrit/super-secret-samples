import type { MetaFunction } from '@remix-run/node'
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
        <div
            id="samples-page"
            className="flex flex-col font-mono text-sssdarkblue bg-sssoffwhite h-screen items-center justify-center"
        >
            <div id="main">
                <SampleDropZone />
            </div>
        </div>
    )
}
