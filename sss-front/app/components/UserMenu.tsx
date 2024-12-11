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
                <CircleUser size={28} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mx-16 my-8">
                <DropdownMenuItem>settings</DropdownMenuItem>
                <DropdownMenuItem>upload samples</DropdownMenuItem>
                <DropdownMenuItem>request samples</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
