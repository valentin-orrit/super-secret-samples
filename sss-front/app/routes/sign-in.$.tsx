import { SignIn } from '@clerk/remix'

export default function SignInPage() {
    return (
        <div className="flex min-h-full items-center justify-center pt-20">
            <SignIn />
        </div>
    )
}
