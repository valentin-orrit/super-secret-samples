import { NavLink, Link } from 'react-router';
import Shape from './Shape'

interface NavbarProps {
    isShowroomMode: boolean
}

export default function Navbar({ isShowroomMode }: NavbarProps) {
    return (
        <div
            id="navbar"
            className="flex pr-4 min-h-12 items-center justify-between text-sssoffwhite bg-sssdarkblue w-full sticky top-0 z-10"
        >
            <Link to={'/'}>
                <img
                    src="/logos/logo-dark-text.png"
                    alt="website logo"
                    className="hidden sm:block"
                    width="112px"
                />
                <img
                    src="/logos/logo-dark.png"
                    alt="website logo small"
                    className="block sm:hidden"
                    width="56px"
                />
            </Link>

            {isShowroomMode && (
                <div
                    className="hidden sm:absolute left-1/2 -translate-x-1/2 text-3xl text-sssyellow font-thin">SHOWROOM
                </div>
            )}

            <div id="nav-list" className="flex text-md font-normal text-xs sm:text-base">
                <NavLink
                    to="/samples"
                    className={({ isActive }) =>
                        isActive ? 'text-sssorange' : 'hover:text-sssyellow'
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
                            <span className="w-10 absolute top-6">
                                {isActive && (
                                    <Shape instrument="nav_selector" width={24}/>
                                )}
                            </span>
                        </div>
                    )}
                </NavLink>
                <NavLink
                    to="/sample-request"
                    className={({ isActive }) =>
                        isActive ? 'text-sssorange' : 'hover:text-sssyellow'
                    }
                >
                    {({ isActive }) => (
                        <div className="relative flex flex-col items-center">
                            <span
                                id="sample-request"
                                className="hover:text-sssyellow mx-1 sm:mx-4"
                            >
                                request
                            </span>
                            <span className="w-10 absolute top-6">
                                {isActive && (
                                    <Shape instrument="nav_selector" width={24}/>
                                )}
                            </span>
                        </div>
                    )}
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive ? 'text-sssorange' : 'hover:text-sssyellow'
                    }
                >
                    {({ isActive }) => (
                        <div className="relative flex flex-col items-center">
                            <span
                                id="about"
                                className="hover:text-sssyellow mx-1 sm:mx-4"
                            >
                                about
                            </span>
                            <span className="w-10 absolute top-6">
                                {isActive && (
                                    <Shape instrument="nav_selector" width={24}/>
                                )}
                            </span>
                        </div>
                    )}
                </NavLink>
            </div>
        </div>
    )
}
