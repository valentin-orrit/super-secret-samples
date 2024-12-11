import { NavLink, Link } from '@remix-run/react'
import Shape from './Shape'
import { Volume2 } from 'lucide-react'
import { CircleUser } from 'lucide-react'

export default function Navbar() {
    return (
        <div
            id="navbar"
            className="flex py-1 px-4 items-center justify-between text-sssoffwhite bg-sssdarkblue w-screen"
        >
            <Link to={'/'}>
                <img
                    src="/logos/logo-dark-text.svg"
                    alt="website logo"
                    width="130px"
                />
            </Link>

            <div id="nav-list" className="flex">
                <NavLink
                    to="/samples"
                    className={({ isActive }) =>
                        isActive ? 'text-sssorange' : 'hover:text-sssorange'
                    }
                >
                    {({ isActive }) => (
                        <div className="flex flex-col items-center">
                            <span
                                id="samples"
                                className="hover:text-sssyellow mx-4"
                            >
                                samples
                            </span>
                            <span className="w-14 absolute top-11">
                                {isActive && (
                                    <Shape instrument="nav_selector" />
                                )}
                            </span>
                        </div>
                    )}
                </NavLink>
                <NavLink
                    to="/library"
                    className={({ isActive }) =>
                        isActive ? 'text-sssorange' : 'hover:text-sssorange'
                    }
                >
                    {({ isActive }) => (
                        <div className="flex flex-col items-center">
                            <span
                                id="library"
                                className="hover:text-sssyellow mx-4"
                            >
                                library
                            </span>
                            <span className="w-14 absolute top-11">
                                {isActive && (
                                    <Shape instrument="nav_selector" />
                                )}
                            </span>
                        </div>
                    )}
                </NavLink>
            </div>

            <div id="menus" className="flex">
                <CircleUser className="mx-2" />
                <Volume2 className="mx-2" />
            </div>
        </div>
    )
}
