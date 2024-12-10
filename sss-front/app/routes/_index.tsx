import type { MetaFunction } from '@remix-run/node'
import Shape from '../components/Shape'

export const meta: MetaFunction = () => {
    return [
        { title: 'New Remix App' },
        { name: 'description', content: 'Welcome to Remix!' },
    ]
}

export default function Index() {
    return (
        <div className="flex h-screen items-center justify-center font-mono text-sssoffwhite  bg-sssdarkblue">
            <div className="flex flex-col items-center m-4" id="shapes">
                <div className="flex m-4 w-44 sm:w-96">
                    <div className="flex flex-col sm:flex-row" id="shapes-top">
                        <Shape instrument="arps" />
                        <Shape instrument="synths" />
                    </div>
                    <div className="flex flex-col sm:flex-row" id="shapes-bot">
                        <Shape instrument="pads_logo" />
                        <Shape instrument="drums_logo" />
                    </div>
                </div>

                <h1
                    className="text-3xl sm:text-4xl font-normal text-center"
                    id="title"
                >
                    super secret <span className="text-sssred">samples</span>
                </h1>

                <h2
                    className="font-extralight text-xs sm:text-sm pt-1 text-center mt-2 sm:mt-0"
                    id="subtitle"
                >
                    quality samples for producers who want a unique sound
                </h2>

                <div id="enter"></div>
            </div>
        </div>
    )
}
