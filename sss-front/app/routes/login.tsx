import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import Shape from '../components/Shape'

export const meta: MetaFunction = () => {
    return [
        { title: 'samples page - super secret samples' },
        { name: 'description', content: 'log to your profile!' },
    ]
}

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center mt-40">
            <div className="flex align-middle items-center">
                <Shape instrument="arps" width="30" />
                <h2 className="font-bold text-sssblue text-2xl text-center">
                    login
                </h2>
            </div>

            <form className="w-1/2 mx-12 my-4 px-10 py-4 border rounded-2xl bg-white">
                <div className="flex flex-col my-2">
                    <label htmlFor="email">email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        autoComplete="on"
                        className="border rounded-lg my-2 p-1 text-sm"
                    />
                </div>

                <div className="flex flex-col my-2">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password">password</label>
                        <Link
                            to="/"
                            className="font-thin text-xs underline text-sssaccentgray hover:text-sssblue"
                        >
                            forgot password?
                        </Link>
                    </div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="border rounded-lg my-2 p-1 text-sm focus:border-sssyellow"
                    />
                </div>

                <div className="w-full text-center">
                    <input
                        type="submit"
                        value="log in"
                        className="m-6 py-2 px-10 cursor-pointer text-sssoffwhite bg-sssblue hover:bg-teal-500 rounded-full"
                    />
                </div>
            </form>
        </div>
    )
}
