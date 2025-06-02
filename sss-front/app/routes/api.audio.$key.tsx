import type { LoaderFunctionArgs } from 'react-router';
import { redirect } from 'react-router';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export async function loader({ params }: LoaderFunctionArgs) {
    const key = params.key

    if (!key) {
        return new Response('Missing audio key', { status: 400 })
    }

    try {
        const s3Client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
        })

        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: decodeURIComponent(key),
        })

        const signedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 300,
        })

        return redirect(signedUrl)
    } catch (error) {
        console.error('Error generating pre-signed URL:', error)
        return new Response('Error accessing audio file', { status: 500 })
    }
}
