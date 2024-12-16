import type { MetaFunction } from '@remix-run/node'
import { SignIn } from '@clerk/remix'

export const meta: MetaFunction = () => {
    return [
        { title: 'samples page - super secret samples' },
        { name: 'description', content: 'sign in to your profile!' },
    ]
}

export default function SignInPage() {
    return (
        <div className="flex flex-col items-center align-middle my-12">
            <SignIn />
        </div>
    )
}
