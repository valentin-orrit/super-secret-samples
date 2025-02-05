import fs from 'fs'
import path from 'path'
import zlib from 'zlib'
import { exec } from 'child_process'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import prisma from '../../prisma/client'

interface SampleMetadata {
    name: string
    bpm?: number
    key?: string
    loop: boolean
    genres: number[]
    instruments: number[]
    tags: string[]
}

interface SampleFile {
    sampleFilePath: string
    sampleMetadata: SampleMetadata
}

const awsBucket = process.env.AWS_S3_BUCKET_NAME
const awsRegion = process.env.AWS_REGION
const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3Client({
    region: awsRegion,
    credentials: {
        accessKeyId: awsAccessKeyId!,
        secretAccessKey: awsSecretAccessKey!,
    },
})

export default async function processAndUploadSample({
    sampleFilePath,
    sampleMetadata,
}: SampleFile): Promise<void> {
    const originalGzippedPath = `${sampleMetadata.name}.gz`
    const compressedMp3Path = `${sampleMetadata.name}.mp3`

    try {
        await gzipFile(sampleFilePath, originalGzippedPath)

        await compressWithFFmpeg(sampleFilePath, compressedMp3Path)

        const s3OriginalKey = `original/${path.basename(originalGzippedPath)}`
        const s3CompressedKey = `compressed/${path.basename(compressedMp3Path)}`

        await uploadToS3(originalGzippedPath, s3OriginalKey)
        await uploadToS3(compressedMp3Path, s3CompressedKey)

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
                        id: genre,
                    })),
                },
                instruments: {
                    connect: sampleMetadata.instruments.map((instrument) => ({
                        id: instrument,
                    })),
                },
                tags: {
                    connectOrCreate: sampleMetadata.tags.map((tag) => ({
                        where: { name: tag },
                        create: { name: tag },
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
        fs.unlinkSync(originalGzippedPath)
        fs.unlinkSync(compressedMp3Path)
    }
}

// compress original WAV file to GZ for storage
function gzipFile(inputPath: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const input = fs.createReadStream(inputPath)
        const output = fs.createWriteStream(outputPath)
        const gzip = zlib.createGzip()

        input.pipe(gzip).pipe(output).on('finish', resolve).on('error', reject)
    })
}

// compress original WAV file to 192kbps MP3 for streaming
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

// upload file to S3 bucket
async function uploadToS3(filePath: string, s3Key: string): Promise<void> {
    const fileStream = fs.createReadStream(filePath)
    const uploadParams = {
        Bucket: awsBucket,
        Key: s3Key,
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
