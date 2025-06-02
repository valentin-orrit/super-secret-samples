import { useEffect } from 'react'
import { ToastAction } from '@radix-ui/react-toast'
import { Link } from '@remix-run/react'
import { useToast } from '../hooks/use-toast'

export default function WelcomeToast() {
    const { toast } = useToast()

    useEffect(() => {
        toast({
            title: `Welcome back!`,
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
    }, [])

    return null
}
