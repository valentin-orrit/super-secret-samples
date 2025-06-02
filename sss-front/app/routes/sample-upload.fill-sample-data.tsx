import type { MetaFunction } from 'react-router';
import { useLocation, useLoaderData, useActionData } from 'react-router';
import { FileWithPath } from 'react-dropzone-esm'
import SampleDataFill from '../components/SampleDataFill'
import prisma from '../../prisma/client'
import { ActionFunction } from 'react-router';
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
    const results = useActionData<typeof action>()

    if (results) {
        return (
            <div className="flex flex-col items-center justify-center min-w-screen min-h-screen">
                <div className="text-2xl text-sssblue">
                    YAY! samples uploaded!
                </div>
            </div>
        )
    }

    if (!samples || samples.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-w-screen min-h-screen">
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
