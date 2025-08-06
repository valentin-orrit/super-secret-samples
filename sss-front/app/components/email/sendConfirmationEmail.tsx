export default async function sendConfirmationEmail(clientEmail: string, description: string) {
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
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #2c3e50; text-align: center;">Thank you for your exclusive sample request! 🎵</h2>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p>Hi there!</p>
                        <p>We've received your exclusive sample request and we're excited to work with you.</p>
                        <p><strong>Your request:</strong></p>
                        <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #ffc107;">
                            ${description.replace(/\n/g, '<br>')}
                        </div>
                    </div>

                    <div style="background-color: #d1ecf1; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #0c5460;">What happens next?</h3>
                        <ul>
                            <li>🎯 We'll review your request and send you our prices as soon as possible</li>
                        </ul>
                    </div>

                    <div style="text-align: center; margin: 30px 0;">
                        <p style="color: #6c757d;">Questions? Just reply to this email!</p>
                        <p><strong>The super secret samples Team</strong></p>
                    </div>
                </div>
            </body>
        </html>
    `

    const textContent = `
Thank you for your sample request!

Hi there!

We've received your exclusive sample request and we're excited to work with you.

Your request: ${description}

What happens next?
- We'll review your request and send you our prices as soon as possible

Questions? Just reply to this email!

The super secret samples Team
    `.trim()

    const params = {
        Source: process.env.SES_FROM_EMAIL!,
        Destination: {
            ToAddresses: [clientEmail],
        },
        Message: {
            Subject: {
                Data: `🎵 Your sample request has been received - super secret samples`,
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
    }

    try {
        const command = new SendEmailCommand(params)
        await sesClient.send(command)
        console.log('Confirmation email sent to client')
    } catch (error) {
        console.error('Error sending confirmation email:', error)
    }
}