import { Link } from '@remix-run/react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { CircleUser } from 'lucide-react'

export default function UserMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <CircleUser size={30} strokeWidth={2} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mx-16 my-5 rounded-xl text-sssdarkblue">
                <DropdownMenuItem>settings</DropdownMenuItem>
                <DropdownMenuItem>
                    <Link to="/sample-upload">upload samples</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link to="/sample-request">request samples</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
