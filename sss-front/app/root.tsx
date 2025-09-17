import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    useLocation,
} from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'
import { checkSiteAuth } from './lib/authStore.server'
import './tailwind.css'
import { Toaster } from './components/ui/sonner'
import Navbar from './components/Navbar'
import { Footer } from "~/components/Footer"

export async function loader({ request }: LoaderFunctionArgs) {
    const isAuthenticated = checkSiteAuth(request)
    return { isAuthenticated }
}

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="h-dvh">
        <head title="super secret samples">
            <meta charSet="utf-8"/>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <Meta/>
            <Links/>
            <title>super secret samples</title>
        </head>
        <body>
        {children}
        <ScrollRestoration/>
        <Scripts/>
        <Toaster closeButton richColors/>
        </body>
        </html>
    )
}

function App() {
    const location = useLocation()
    const isRoot = location.pathname === '/'
    const { isAuthenticated } = useLoaderData() as { isAuthenticated: boolean }

    return (
        <div
            id="root"
            className="flex flex-col min-h-screen font-mono text-sssdarkblue bg-sssoffwhite"
        >
            {!isRoot && isAuthenticated && <Navbar/>}
            <main className="flex-grow">
                <Outlet/>
            </main>
            {!isRoot && <Footer/>}
        </div>
    )
}

export default App
