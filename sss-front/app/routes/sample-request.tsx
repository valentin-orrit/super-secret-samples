import {
    redirect,
    type LoaderFunction,
    type MetaFunction,
} from '@remix-run/node'
import { getAuth } from '@clerk/remix/ssr.server'

export const meta: MetaFunction = () => {
    return [
        { title: 'request samples - super secret samples' },
        {
            name: 'description',
            content:
                'request samples to be created and uploaded in the samples page!',
        },
    ]
}

export const loader: LoaderFunction = async (args) => {
    const { userId } = await getAuth(args)

    if (!userId) return redirect('/sign-in')

    return { data: { userId } }
}

export default function SamplesPage() {
    return (
        <div
            id="samples-page"
            className="flex flex-col font-mono text-sssdarkblue bg-sssoffwhite min-h-screen"
        >
            <div id="main">
                <h1>request samples page</h1>
            </div>
        </div>
    )
}
