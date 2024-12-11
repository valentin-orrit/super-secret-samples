import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import Shape from '../components/Shape'

export const meta: MetaFunction = () => {
    return [
        { title: 'super secret samples' },
        { name: 'description', content: 'Welcome to super secret samples!' },
    ]
}

export default function Index() {
    return (
        <div className="flex h-screen items-center justify-center font-mono text-sssoffwhite bg-sssdarkblue">
            <div id="shapes" className="flex flex-col items-center m-4">
                <div className="flex m-4 w-44 sm:w-96">
                    <div id="shapes-top" className="flex flex-col sm:flex-row">
                        <Shape instrument="arps" />
                        <Shape instrument="synths" />
                    </div>
                    <div id="shapes-bot" className="flex flex-col sm:flex-row">
                        <Shape instrument="pads_logo" />
                        <Shape instrument="drums_logo" />
                    </div>
                </div>

                <h1
                    id="title"
                    className="text-3xl sm:text-4xl font-normal text-center"
                >
                    super secret <span className="text-sssred">samples</span>
                </h1>

                <h2
                    id="subtitle"
                    className="font-extralight text-xs sm:text-sm pt-1 text-center mt-2 sm:mt-0"
                >
                    quality samples for producers who want a unique sound
                </h2>

                <Link
                    to={'/samples'}
                    className="m-6 py-2 px-10 bg-sssorange hover:bg-orange-400 rounded-full"
                >
                    enter
                </Link>
            </div>
        </div>
    )
}
