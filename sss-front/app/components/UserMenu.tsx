import { Link } from '@remix-run/react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from './ui/dropdown-menu'
import { CircleUser } from 'lucide-react'
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
                    className="text-md tracking-tighter text-sssyellow bg-sssblue hover:bg-teal-500 rounded-full py-1 px-4"
                >
                    sign in
                </Link>
            )}
        </>
    )
}
