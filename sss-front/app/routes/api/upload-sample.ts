import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
// import { json } from '@remix-run/node'
import { data } from '@remix-run/node'
import prisma from '../../../prisma/client'

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
})

export const action = async ({ request }: { request: Request }) => {
    const formData = await request.formData()
    const sampleName = formData.get('name') as string
    const fileName = formData.get('fileName') as string

    if (!sampleName || !fileName) {
        return data({ error: 'Missing required fields' }, { status: 400 })
    }

    const s3Key = `samples/${Date.now()}-${fileName}`
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: s3Key,
        ACL: 'public-read',
    })

    // Generate pre-signed URL
    const uploadURL = await s3.getSignedUrl(command, { expiresIn: 3600 })

    // Save metadata to DB
    const sample = await prisma.sample.create({
        data: {
            name: sampleName,
            s3ReferenceName: s3Key,
        },
    })

    return data({ uploadURL, sample }), { status: 201 }
}
