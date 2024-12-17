import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLocation,
} from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/node'
import { ClerkApp } from '@clerk/remix'
import { rootAuthLoader } from '@clerk/remix/ssr.server'
import './tailwind.css'
import { Toaster } from './components/ui/toaster'
import Navbar from './components/Navbar'

export const loader: LoaderFunction = (args) => rootAuthLoader(args)

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="h-dvh">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
                <Toaster />
            </body>
        </html>
    )
}

function App() {
    const location = useLocation()
    const isRoot = location.pathname === '/'

    return (
        <div
            id="root"
            className="flex flex-col min-h-screen font-mono text-sssdarkblue bg-sssoffwhite"
        >
            {!isRoot && <Navbar />}
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    )
}

export default ClerkApp(App)
