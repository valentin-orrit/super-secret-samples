import { MetaFunction, useLoaderData, Link } from 'react-router'
import Shape from '../components/Shape'
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

export const meta: MetaFunction = () => {
    return [
        { title: 'super secret samples' },
        { name: 'description', content: 'Welcome to super secret samples!' },
    ]
}

export async function loader() {
    const isShowroomMode = process.env.SHOWROOM_MODE === 'true'

    return { isShowroomMode }
}


export default function Index() {
    const [isLoading, setIsLoading] = useState(true)
    const { isShowroomMode } = useLoaderData<typeof loader>()

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])

    return (
        <div className="flex h-screen items-center justify-center text-sssoffwhite bg-sssdarkblue">
            {isLoading
                ?
                <Loader2 className="animate-spin direction-reverse " size="40"/>
                :
                <div
                    className="flex h-screen items-center justify-center text-sssoffwhite bg-sssdarkblue animate-in fade-in">
                    <div id="shapes" className="flex flex-col items-center m-4">
                        <div className="flex m-4">
                            <div id="shapes-top" className="flex flex-row">
                                <div className="animate-in slide-in-from-bottom spin-in-3 duration-300 w-18 sm:w-20">
                                    <Shape instrument="bass"/>
                                </div>
                                <div className="animate-in slide-in-from-bottom spin-in-6 duration-300 w-18 sm:w-20">
                                    <Shape instrument="drums"/>
                                </div>
                            </div>
                            <div id="shapes-bot" className="flex flex-row">
                                <div className="animate-in slide-in-from-bottom spin-in-12 duration-500 w-18 sm:w-20">
                                    <Shape instrument="synths"/>
                                </div>
                                <div className="animate-in slide-in-from-bottom spin-in-45 duration-700 w-18 sm:w-20">
                                    <Shape instrument="percs"/>
                                </div>
                                <div className="animate-in slide-in-from-bottom spin-in-90 duration-1000 w-18 sm:w-20">
                                    <Shape instrument="pads"/>
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex flex-col justify-center align-middle items-center bg-sssdarkblue z-50 opacity-100">
                            <h1
                                id="title"
                                className="text-2xl sm:text-4xl font-normal text-center"
                            >
                                super secret <span
                                className="text-sssred animate-in fade-in duration-1000">samples</span> {isShowroomMode && (
                                <span className="text-sm font-thin text-sssyellow italic relative -top-1.5">showroom</span>
                            )}
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
                </div>}
        </div>

    )
}
