import {
    type MetaFunction,
    type LoaderFunction,
    redirect,
} from '@remix-run/node'
import { getAuth } from '@clerk/remix/ssr.server'
import SampleHeader from '~/components/SampleHeader'
import WelcomeToast from '~/components/Toast'
import SampleTableHead from '~/components/SampleTableHead'

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
            <WelcomeToast />
            <SampleHeader title="library" />
            <div
                id="main"
                className="flex flex-col justify-center items-center bg-white"
            >
                <div className="w-full mb-4 px-4">
                    <div className="sticky top-[69px] z-50 bg-white">
                        <SampleTableHead />
                    </div>
                </div>
            </div>
        </div>
    )
}
