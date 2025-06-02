import { type MetaFunction } from '@remix-run/node'
import SampleHeader from '../components/SampleHeader'
import SampleTableHead from '../components/SampleTableHead'
import { Sample } from '../../prisma/client'

export const meta: MetaFunction = () => {
    return [
        { title: 'samples page - super secret samples' },
        { name: 'description', content: 'browse samples!' },
    ]
}

export default function Library() {
    // temporary samples to prevent breaking error
    const samples: Sample[] = []

    return (
        <div>
            <SampleHeader title="library" samples={samples} />
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
