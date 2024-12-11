import type { MetaFunction } from '@remix-run/node'

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

export default function SamplesPage() {
    return (
        <div
            id="samples-page"
            className="flex flex-col font-mono text-sssdarkblue bg-sssoffwhite h-screen"
        >
            <div id="main">
                <h1>upload samples page</h1>
            </div>
        </div>
    )
}
