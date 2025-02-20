import { useEffect } from 'react'
import { ToastAction } from '@radix-ui/react-toast'
import { Link } from '@remix-run/react'
import { useToast } from '../hooks/use-toast'
import { useUser } from '@clerk/remix'

export default function WelcomeToast() {
    const { toast } = useToast()
    const { user } = useUser()

    useEffect(() => {
        if (user && user.lastSignInAt) {
            const lastSignIn = Math.floor(
                new Date(user.lastSignInAt).getTime() / 1000
            )
            const currentTime = Math.floor(Date.now() / 1000)

            if (currentTime - lastSignIn <= 20) {
                toast({
                    title: `Welcome back ${user.emailAddresses[0]}!`,
                    description:
                        'If you want exclusive samples, please send us a request.',
                    duration: 5000,
                    className: 'bg-white text-sssdarkblue text-sm rounded-xl',
                    action: (
                        <ToastAction altText="request samples" asChild>
                            <Link
                                className="py-2 px-4 bg-sssyellow hover:bg-yellow-400 rounded-full"
                                to="/sample-request"
                            >
                                request
                            </Link>
                        </ToastAction>
                    ),
                })
            }
        }
    }, [user, toast])

    return null
}
