import { Link } from '@remix-run/react'

export default function Navbar() {
    return (
        <div
            id="navbar"
            className="flex py-2 px-4 items-center justify-between text-sssoffwhite bg-sssdarkblue w-screen"
        >
            <img
                src="/logos/logo-dark-text.svg"
                alt="website logo"
                width="130px"
            />

            <div id="nav-list" className="flex">
                <Link to={'/samples'}>samples</Link>
                <Link to={'/library'}>library</Link>
            </div>

            <div id="menus" className="flex">
                <p>menu</p>
                <p>sound</p>
            </div>
        </div>
    )
}
