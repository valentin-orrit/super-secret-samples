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

export default function App() {
    const location = useLocation()
    const isRoot = location.pathname === '/'

    return (
        <div id="root">
            {!isRoot && <Navbar />}
            <Outlet />
        </div>
    )
}
