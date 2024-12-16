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
        <div className="flex flex-col items-center justify-center m-14 p-8 border rounded-xl bg-white">
            <SignIn />
        </div>
    )
}
