import type { MetaFunction } from '@remix-run/node'
import { Link, useSearchParams } from '@remix-run/react'
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
    const [searchParams] = useSearchParams()
    const { toast } = useToast()
    const { user } = useUser()

    useEffect(() => {
        if (user) {
            toast({
                title: `Welcome back ${user.emailAddresses}!`,
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
    }, [searchParams, toast, user])

    return (
        <div>
            <div id="main">
                <h1>samples page</h1>
            </div>
        </div>
    )
}
