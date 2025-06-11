import type { LoaderFunctionArgs } from 'react-router'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import zlib from 'zlib'
import prisma from '../../prisma/client'

export async function loader({ params }: LoaderFunctionArgs) {
    const sampleId = params.sampleId

    if (!sampleId || isNaN(parseInt(sampleId))) {
        return new Response('Invalid sample ID', { status: 400 })
    }

    try {
        // Get sample from database
        const sample = await prisma.sample.findUnique({
            where: { id: parseInt(sampleId) },
        })

        if (!sample) {
            return new Response('Sample not found', { status: 404 })
        }

        const s3Client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
        })

        // Get the gzipped file from S3
        const getObjectCommand = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: sample.s3ReferenceName,
        })

        const s3Response = await s3Client.send(getObjectCommand)

        if (!s3Response.Body) {
            return new Response('File not found in S3', { status: 404 })
        }

        // Convert the S3 stream to buffer
        const gzippedBuffer = await streamToBuffer(
            s3Response.Body as NodeJS.ReadableStream
        )

        // Decompress the gzipped file
        const decompressedBuffer = zlib.gunzipSync(gzippedBuffer)

        // Return response with proper headers for download
        return new Response(decompressedBuffer, {
            headers: {
                'Content-Type': 'audio/wav',
                'Content-Disposition': `attachment; filename="${sample.name}.wav"`,
                'Content-Length': decompressedBuffer.length.toString(),
                'Cache-Control': 'no-cache',
            },
        })
    } catch (error) {
        console.error('Download error:', error)
        return new Response('Internal server error', { status: 500 })
    }
}

// Helper function to convert stream to buffer
async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    const chunks: Buffer[] = []

    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
        stream.on('error', (err) => reject(err))
        stream.on('end', () => resolve(Buffer.concat(chunks)))
    })
}
