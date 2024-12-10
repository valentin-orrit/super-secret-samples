import type { MetaFunction } from '@remix-run/node'
import Navbar from '../components/Navbar'

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
            className="flex flex-col font-mono text-sssdarkblue"
        >
            <Navbar />
            <div id="main">samples page</div>
        </div>
    )
}
