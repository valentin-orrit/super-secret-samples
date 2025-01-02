import type { MetaFunction } from '@remix-run/node'
import { useLocation, useLoaderData } from '@remix-run/react'
import { FileWithPath } from 'react-dropzone-esm'
import SampleDataFill from '../components/SampleDataFill'
import prisma from '../../prisma/client'

interface LocationState {
    samples: FileWithPath[]
}

export const meta: MetaFunction = () => {
    return [
        { title: 'upload samples - super secret samples' },
        {
            name: 'description',
            content:
                'upload samples to be reviewed and displayed in the samples page!',
        },
    ]
}

export async function loader() {
    const instruments = await prisma.instrument.findMany()
    const genres = await prisma.genre.findMany()
    const tags = await prisma.tag.findMany()
    return { instruments, genres, tags }
}

export default function FillSampleData() {
    const { instruments, genres, tags } = useLoaderData<typeof loader>()
    const location = useLocation()
    const state = location.state as LocationState
    const samples = state?.samples

    return (
        <div className="flex flex-col items-center justify-center min-w-screen min-h-screen">
            <SampleDataFill
                samples={samples}
                instruments={instruments}
                genres={genres}
                tags={tags}
            />
        </div>
    )
}
