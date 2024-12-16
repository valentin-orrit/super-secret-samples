import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
    return [
        { title: 'samples page - super secret samples' },
        { name: 'description', content: 'log to your profile!' },
    ]
}

export default function Login() {
    return (
        <div className="h-full">
            <h2>log in</h2>
        </div>
    )
}
