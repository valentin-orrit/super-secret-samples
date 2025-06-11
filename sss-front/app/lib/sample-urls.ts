export function getStreamUrl(sample: {
    s3CompressedReferenceName: string
}): string {
    const bucket =
        process.env.AWS_S3_BUCKET_NAME ||
        import.meta.env.VITE_AWS_S3_BUCKET_NAME
    const region = process.env.AWS_REGION || import.meta.env.VITE_AWS_REGION

    return `https://${bucket}.s3.${region}.amazonaws.com/${sample.s3CompressedReferenceName}`
}

export function getDownloadUrl(sampleId: number): string {
    return `/api/download-sample/${sampleId}`
}
