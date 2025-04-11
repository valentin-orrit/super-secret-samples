import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

interface SamplefilterMenuProps {
    menuTitle: string
    menuContent: string[]
}

export default function SamplefilterMenu({
    menuTitle,
    menuContent,
}: SamplefilterMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex bg-white mt-2 px-4 py-2 gap-2 border rounded-xl group">
                    <div className="flex">{menuTitle}</div>
                    <ChevronDown />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {menuContent.map((menuContentElement) => {
                    return (
                        <DropdownMenuItem key={menuContentElement}>
                            {menuContentElement}
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
