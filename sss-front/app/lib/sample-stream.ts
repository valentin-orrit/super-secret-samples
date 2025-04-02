import prisma from '../../prisma/client'

const awsBucket = process.env.AWS_S3_BUCKET_NAME
const awsRegion = process.env.AWS_REGION

export default async function getSampleStreamUrl(
    sampleId: number
): Promise<string | null> {
    const sample = await prisma.sample.findUnique({
        where: { id: sampleId },
    })

    if (!sample || !sample.s3CompressedReferenceName) {
        return null
    }

    return `https://${awsBucket}.s3.${awsRegion}.amazonaws.com/${sample.s3CompressedReferenceName}`
}
