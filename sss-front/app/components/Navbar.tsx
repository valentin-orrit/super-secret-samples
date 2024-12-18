import { NavLink, Link } from '@remix-run/react'
import Shape from './Shape'
import UserMenu from './UserMenu'
import { VolumeSliderMenu } from './VolumeSliderMenu'

export default function Navbar() {
    return (
        <div
            id="navbar"
            className="flex py-1 px-4 min-h-16 items-center justify-between text-sssoffwhite bg-sssdarkblue w-full sticky top-0 z-10"
        >
            <Link to={'/'}>
                <img
                    src="/logos/logo-dark-text.svg"
                    alt="website logo"
                    className="hidden sm:block"
                    width="130px"
                />
                <img
                    src="/logos/logo-dark.svg"
                    alt="website logo small"
                    className="block sm:hidden"
                    width="60px"
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
                        <div className="relative flex flex-col items-center">
                            <span
                                id="samples"
                                className="hover:text-sssyellow mx-1 sm:mx-4"
                            >
                                samples
                            </span>
                            <span className="w-14 absolute top-6">
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
                        <div className="relative flex flex-col items-center">
                            <span
                                id="library"
                                className="hover:text-sssyellow  mx-1 sm:mx-4"
                            >
                                library
                            </span>
                            <span className="w-14 absolute top-6">
                                {isActive && (
                                    <Shape instrument="nav_selector" />
                                )}
                            </span>
                        </div>
                    )}
                </NavLink>
            </div>

            <div id="menus" className="flex items-center">
                <div id="user-menu" className="mx-2 flex items-center">
                    <UserMenu />
                </div>
                <div id="user-menu" className="mx-2">
                    <VolumeSliderMenu />
                </div>
            </div>
        </div>
    )
}
