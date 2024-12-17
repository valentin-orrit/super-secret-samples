import { Link } from '@remix-run/react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from './ui/dropdown-menu'
import { CircleUser, LogIn } from 'lucide-react'
import { useUser, useClerk } from '@clerk/remix'

export default function UserMenu() {
    const { isSignedIn } = useUser()
    const { signOut } = useClerk()

    return (
        <>
            {isSignedIn ? (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <CircleUser size={30} strokeWidth={2} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mx-16 my-5 rounded-xl text-sssdarkblue">
                        {isSignedIn ? (
                            <>
                                <DropdownMenuItem>settings</DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to="/sample-upload">
                                        upload samples
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to="/sample-request">
                                        request samples
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => signOut()}
                                    className="text-sssred cursor-pointer"
                                >
                                    Sign Out
                                </DropdownMenuItem>
                            </>
                        ) : (
                            <>
                                <DropdownMenuItem>
                                    <Link to="/sign-in">Sign In</Link>
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Link
                    to="/sign-in"
                    className="flex items-center gap-2 text-md tracking-tighter text-sssyellow  hover:bg-teal-500 rounded-full py-1 px-2  hover:px-4 group relative"
                >
                    <LogIn
                        strokeWidth={2}
                        className="size-7 group-hover:size-5 duration-300"
                    />
                    <span className="text-[0px] group-hover:text-sm duration-300">
                        sign in
                    </span>
                </Link>
            )}
        </>
    )
}
