import { MetaFunction } from '@remix-run/node'
import { SignUp } from '@clerk/remix'

export const meta: MetaFunction = () => {
    return [
        { title: 'samples page - super secret samples' },
        { name: 'description', content: 'sign in to your profile!' },
    ]
}

export default function SignUpPage() {
    return (
        <div className="flex flex-col items-center align-middle my-12">
            <SignUp />
        </div>
    )
}
