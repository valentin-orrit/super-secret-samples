import { Link } from 'react-router'

export function Footer() {

    return (
        <div
            id="footer"
            className="flex flex-col pr-4 min-h-36 items-center justify-center text-sssoffwhite bg-sssdarkblue w-full z-10 text-sm font-normal gap-4"
        >
            <div className="flex flex-row gap-4 justify-around">

                <Link to={'/sample-request'} className="hover:underline">
                    request
                </Link>

                <Link to={'/terms-of-use'} className="hover:underline">
                    terms of use
                </Link>

                <Link to={'/about'} className="hover:underline">
                    about
                </Link>
            </div>

            <div className="flex flex-col text-[11px] font-thin text-sssmutegray">
                <p>website and samples by valentin orrit</p>
                <p>copyright © 2025 - super secret samples</p>
            </div>

        </div>
    )
}