export default async function sendSampleRequestEmail({description, email, instruments, genres}: {
    description: string
    email: string
    instruments: string[]
    genres: string[]
}) {
    const {SESClient, SendEmailCommand} = await import('@aws-sdk/client-ses')

    const sesClient = new SESClient({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
    })

    const htmlContent = `
        <html lang="en">
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #2c3e50;">New Sample Request - super secret samples</h2>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #495057;">Client Information</h3>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                </div>

                <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #856404;">Request Description</h3>
                    <p style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #ffc107;">
                        ${description.replace(/\n/g, '<br>')}
                    </p>
                </div>

                <div style="display: flex; gap: 20px; margin: 20px 0;">
                    <div style="flex: 1; background-color: #d1ecf1; padding: 20px; border-radius: 8px;">
                        <h3 style="margin-top: 0; color: #0c5460;">Requested Instruments</h3>
                        <ul style="list-style-type: none; padding: 0;">
                            ${instruments.map(instrument => `<li style="background-color: white; margin: 5px 0; padding: 8px; border-radius: 4px;">🎵 ${instrument}</li>`).join('')}
                        </ul>
                    </div>

                    <div style="flex: 1; background-color: #d4edda; padding: 20px; border-radius: 8px;">
                        <h3 style="margin-top: 0; color: #155724;">Requested Genres</h3>
                        <ul style="list-style-type: none; padding: 0;">
                            ${genres.map(genre => `<li style="background-color: white; margin: 5px 0; padding: 8px; border-radius: 4px;">🎶 ${genre}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 30px; text-align: center;">
                    <p style="margin: 0; color: #6c757d; font-size: 14px;">
                        This request was submitted through the super secret samples website on ${new Date().toLocaleString()}
                    </p>
                </div>
            </body>
        </html>
    `

    const textContent = `
New Sample Request from super secret samples

Client Email: ${email}

Description: 
${description}

Requested Instruments: ${instruments.join(', ')}

Requested Genres: ${genres.join(', ')}

---
This request was submitted through the super secret samples website on ${new Date().toLocaleString()}.
    `.trim()

    const params = {
        Source: process.env.SES_FROM_EMAIL!,
        Destination: {
            ToAddresses: [process.env.SES_TO_EMAIL!],
        },
        Message: {
            Subject: {
                Data: `🎵 New Sample Request from ${email}`,
                Charset: 'UTF-8',
            },
            Body: {
                Html: {
                    Data: htmlContent,
                    Charset: 'UTF-8',
                },
                Text: {
                    Data: textContent,
                    Charset: 'UTF-8',
                },
            },
        },
        ReplyToAddresses: [email],
    }

    try {
        const command = new SendEmailCommand(params)
        const result = await sesClient.send(command)
        console.log('Email sent successfully:', result.MessageId)
        return result
    } catch (error) {
        console.error('Error sending email:', error)
        throw new Error(`Failed to send email: ${error}`)
    }
}