import fs from 'fs'
import path from 'path'
import zlib from 'zlib'
import { exec } from 'child_process'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import prisma from '../../prisma/client'
import type { Instrument, Genre, Tag } from '../../prisma/client'

interface SampleMetadata {
    name: string
    bpm?: number
    key?: string
    loop: boolean
    genres: Genre[]
    instruments: Instrument[]
    tags: Tag[]
}

interface SampleFile {
    sampleFilePath: string
    sampleMetadata: SampleMetadata
}

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
})

export default async function processAndUploadSample({
    sampleFilePath,
    sampleMetadata,
}: SampleFile): Promise<void> {
    const fileName = path.basename(sampleFilePath, path.extname(sampleFilePath))
    const originalGzippedPath = `${fileName}.gz`
    const compressedMp3Path = `${fileName}_compressed.mp3`

    try {
        // Step 1: Gzip the original audio file
        await gzipFile(sampleFilePath, originalGzippedPath)

        // Step 2: Compress the audio file to 192kbps MP3 using FFmpeg
        await compressWithFFmpeg(sampleFilePath, compressedMp3Path)

        // Step 3: Upload both files to S3
        const s3OriginalKey = `original/${path.basename(originalGzippedPath)}`
        const s3CompressedKey = `compressed/${path.basename(compressedMp3Path)}`

        await uploadToS3(originalGzippedPath, s3OriginalKey)
        await uploadToS3(compressedMp3Path, s3CompressedKey)

        // Step 4: Store metadata in PostgreSQL via Prisma
        await prisma.sample.create({
            data: {
                name: sampleMetadata.name,
                s3ReferenceName: s3OriginalKey,
                s3CompressedReferenceName: s3CompressedKey,
                bpm: sampleMetadata.bpm,
                key: sampleMetadata.key,
                loop: sampleMetadata.loop,
                genres: {
                    connect: sampleMetadata.genres.map((genre) => ({
                        id: genre.id,
                    })),
                },
                instruments: {
                    connect: sampleMetadata.instruments.map((instrument) => ({
                        id: instrument.id,
                    })),
                },
                tags: {
                    connectOrCreate: sampleMetadata.tags.map((tag) => ({
                        where: { name: tag.name },
                        create: { name: tag.name },
                    })),
                },
            },
        })

        console.log(
            `Successfully processed and uploaded sample: ${sampleMetadata.name}`
        )
    } catch (error) {
        console.error(`Error processing sample ${sampleMetadata.name}:`, error)
    } finally {
        // Clean up temporary files
        fs.unlinkSync(originalGzippedPath)
        fs.unlinkSync(compressedMp3Path)
    }
}

function gzipFile(inputPath: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const input = fs.createReadStream(inputPath)
        const output = fs.createWriteStream(outputPath)
        const gzip = zlib.createGzip()

        input.pipe(gzip).pipe(output).on('finish', resolve).on('error', reject)
    })
}

function compressWithFFmpeg(
    inputPath: string,
    outputPath: string
): Promise<void> {
    return new Promise((resolve, reject) => {
        const command = `ffmpeg -i "${inputPath}" -b:a 192k "${outputPath}"`
        exec(command, (error, stderr) => {
            if (error) {
                reject(`FFmpeg error: ${stderr}`)
            } else {
                resolve()
            }
        })
    })
}

async function uploadToS3(filePath: string, s3Key: string): Promise<void> {
    const fileStream = fs.createReadStream(filePath)
    const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: process.env.AWS_ACCESS_KEY_ID,
        Body: fileStream,
    }

    try {
        await s3.send(new PutObjectCommand(uploadParams))
        console.log(
            `Uploaded ${filePath} to s3://${uploadParams.Bucket}/${s3Key}`
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(`S3 upload error: ${error.message}`)
    }
}
