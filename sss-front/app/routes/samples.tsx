import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { useToast } from '../hooks/use-toast'
import { useUser } from '@clerk/remix'
import { useEffect } from 'react'
import { ToastAction } from '@radix-ui/react-toast'

export const meta: MetaFunction = () => {
    return [
        { title: 'samples page - super secret samples' },
        { name: 'description', content: 'browse samples!' },
    ]
}

export default function SamplesPage() {
    const { toast } = useToast()
    const { user } = useUser()

    // Toast when user just signed in
    useEffect(() => {
        if (user && user.lastSignInAt) {
            const lastSignIn = Math.floor(
                new Date(user.lastSignInAt).getTime() / 1000
            )
            const currentTime = Math.floor(Date.now() / 1000)

            if (currentTime - lastSignIn <= 5) {
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

    return (
        <div>
            <div id="main">
                <h1>samples page</h1>
            </div>
        </div>
    )
}
