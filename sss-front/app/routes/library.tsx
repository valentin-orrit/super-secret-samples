import {
    type MetaFunction,
    type LoaderFunction,
    redirect,
} from '@remix-run/node'
import { getAuth } from '@clerk/remix/ssr.server'

export const meta: MetaFunction = () => {
    return [
        { title: 'samples page - super secret samples' },
        { name: 'description', content: 'browse samples!' },
    ]
}

export const loader: LoaderFunction = async (args) => {
    const { userId } = await getAuth(args)
    if (!userId) {
        return redirect('/sign-in')
    }
    return {}
}

export default function Library() {
    return (
        <div>
            <div id="main">
                <h1>library page</h1>
            </div>
        </div>
    )
}
