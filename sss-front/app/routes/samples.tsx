import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
    return [
        { title: 'samples page - super secret samples' },
        { name: 'description', content: 'browse samples!' },
    ]
}

export default function SamplesPage() {
    return (
        <div
            id="samples-page"
            className="flex flex-col font-mono text-sssdarkblue bg-sssoffwhite h-screen"
        >
            <div id="main">
                <h1>samples page</h1>
            </div>
        </div>
    )
}
