import type { MetaFunction } from '@remix-run/node'
import Navbar from '../components/Navbar'

export const meta: MetaFunction = () => {
    return [
        { title: 'samples page - super secret samples' },
        { name: 'description', content: 'browse samples!' },
    ]
}

export default function Library() {
    return (
        <div id="library-page">
            <Navbar />
            <p>library</p>
        </div>
    )
}
