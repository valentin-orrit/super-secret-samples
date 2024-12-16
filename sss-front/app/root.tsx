import type { LoaderFunction } from '@remix-run/node'
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLocation,
} from '@remix-run/react'

import './tailwind.css'
import Navbar from './components/Navbar'

import { rootAuthLoader } from '@clerk/remix/ssr.server'
import { ClerkApp } from '@clerk/remix'

export const loader: LoaderFunction = (args) => {
    return rootAuthLoader(args, ({ request }) => {
        const { sessionId, userId, getToken } = request.auth
        // fetch data
        console.log('session ID : ', sessionId)
        console.log('user ID : ', userId)
        console.log('getToken ID : ', getToken)
        return { yourData: 'here' }
    })
}

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body className="flex flex-col font-mono text-sssdarkblue bg-sssoffwhite min-h-screen">
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

function App() {
    const location = useLocation()
    const isRoot = location.pathname === '/'

    return (
        <div id="root">
            {!isRoot && <Navbar />}
            <Outlet />
        </div>
    )
}

export default ClerkApp(App)
