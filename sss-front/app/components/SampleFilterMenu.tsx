import { useState } from 'react'
import { Instrument, Genre } from '../../prisma/client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

interface SamplefilterMenuProps {
    menuTitle: string
    menuContent: Instrument[] | Genre[]
}

export default function SamplefilterMenu({
    menuTitle,
    menuContent,
}: SamplefilterMenuProps) {
    const [open, setOpen] = useState(false)

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger>
                <div className="flex bg-white mt-2 px-4 py-2 gap-2 border rounded-xl group">
                    <div className="flex">{menuTitle}</div>
                    <ChevronDown
                        className={`transition-transform duration-200 ${
                            open ? 'rotate-180' : ''
                        }`}
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {menuContent.map((menuContentItem) => (
                    <DropdownMenuItem key={menuContentItem.name}>
                        {menuContentItem.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
