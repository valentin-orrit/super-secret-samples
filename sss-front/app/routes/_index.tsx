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
            <div className="flex flex-col items-center">
                <Shape />
                <h1 className="text-4xl font-normal">
                    super secret <span className="text-sssred">samples</span>
                </h1>
                <h2 className="font-extralight text-sm pt-1">
                    exclusive samples for elite producers
                </h2>
            </div>
        </div>
    )
}
