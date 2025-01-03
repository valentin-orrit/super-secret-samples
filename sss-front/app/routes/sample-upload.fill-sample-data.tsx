import type { ActionFunction, MetaFunction } from '@remix-run/node'
import { unstable_parseMultipartFormData } from '@remix-run/node'
import { useLocation, useLoaderData } from '@remix-run/react'
import { FileWithPath } from 'react-dropzone-esm'
import SampleDataFill from '../components/SampleDataFill'
import prisma from '../../prisma/client'
import processAndUploadSample from '../lib/sample-upload'
import * as fs from 'fs'

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
    const uploadHandler = async ({ name, data, filename }: any) => {
        if (name.startsWith('file-')) {
            // Create a temporary file path
            const tempPath = `/tmp/${filename}`
            const chunks = []
            for await (const chunk of data) {
                chunks.push(chunk)
            }
            await fs.promises.writeFile(tempPath, Buffer.concat(chunks))
            return tempPath
        }
        const chunks = []
        for await (const chunk of data) {
            chunks.push(chunk)
        }
        return Buffer.concat(chunks).toString()
    }

    try {
        const formData = await unstable_parseMultipartFormData(
            request,
            uploadHandler
        )
        const sampleDataJson = formData.get('sampleData')
        const sampleData = JSON.parse(sampleDataJson as string)

        // Process each sample
        for (let i = 0; i < sampleData.length; i++) {
            const filePath = formData.get(`file-${i}`) as string
            const metadata = sampleData[i]

            await processAndUploadSample({
                sampleFilePath: filePath,
                sampleMetadata: {
                    name: metadata.name,
                    loop: false,
                    genres: metadata.genres.map((id: number) => ({ id })),
                    instruments: metadata.instruments.map((id: number) => ({
                        id,
                    })),
                    tags: metadata.tags.map((name: string) => ({ name })),
                },
            })

            // Clean up temp file
            await fs.promises.unlink(filePath)
        }

        return { success: true }
    } catch (error) {
        console.error('Upload error:', error)
        return { status: 500 }
    }
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
