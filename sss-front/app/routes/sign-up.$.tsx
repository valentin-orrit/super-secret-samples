import { SignUp } from '@clerk/remix'

export default function SignUpPage() {
    return (
        <div className="flex min-h-full items-center justify-center pt-20">
            <SignUp />
        </div>
    )
}
