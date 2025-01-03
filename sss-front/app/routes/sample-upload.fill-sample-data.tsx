import type { MetaFunction } from '@remix-run/node'
import { useLocation, useLoaderData } from '@remix-run/react'
import { FileWithPath } from 'react-dropzone-esm'
import SampleDataFill from '../components/SampleDataFill'
import prisma from '../../prisma/client'
import { ActionFunction } from '@remix-run/node'
import processAndUploadSample from '../lib/sample-upload'
import fs from 'fs'

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

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData()
    const results = []

    const sampleCount = Array.from(formData.entries()).filter(([key]) =>
        key.startsWith('sample-')
    ).length

    for (let i = 0; i < sampleCount; i++) {
        const file = formData.get(`sample-${i}`) as File
        const metadata = JSON.parse(formData.get(`metadata-${i}`) as string)

        // Write file to temp location
        const tempFilePath = `/tmp/${file.name}`
        const buffer = Buffer.from(await file.arrayBuffer())
        await fs.promises.writeFile(tempFilePath, buffer)

        try {
            await processAndUploadSample({
                sampleFilePath: tempFilePath,
                sampleMetadata: metadata,
            })
            results.push({ success: true, name: metadata.name })
        } catch (error) {
            results.push({ success: false, name: metadata.name, error })
        } finally {
            // Clean up temp file
            await fs.promises.unlink(tempFilePath)
        }
    }

    return results
}

export default function FillSampleData() {
    const { instruments, genres, tags } = useLoaderData<typeof loader>()
    const location = useLocation()
    const state = location.state as LocationState
    const samples = state?.samples || []

    if (!samples || samples.length === 0) {
        return (
            <div className=" self-center">
                No samples found. Please upload your samples first.
            </div>
        )
    }

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
