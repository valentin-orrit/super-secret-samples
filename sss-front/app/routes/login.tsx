import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
    return [
        { title: 'samples page - super secret samples' },
        { name: 'description', content: 'log to your profile!' },
    ]
}

export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center m-14 p-8 border rounded-xl bg-white">
            <h2>log in</h2>
        </div>
    )
}
