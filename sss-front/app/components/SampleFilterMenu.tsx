import { useState } from 'react'
import { Instrument, Genre } from '../../prisma/client'
import { useSearchStore } from '~/store'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import Shape from "~/components/Shape";

interface SamplefilterMenuProps {
    menuTitle: string
    menuContent: Instrument[] | Genre[]
    filterType: 'instrument' | 'genre'
}

export default function SamplefilterMenu({
    menuTitle,
    menuContent,
    filterType,
}: SamplefilterMenuProps) {
    const [open, setOpen] = useState(false)
    const {
        selectedInstrument,
        selectedGenre,
        setSelectedInstrument,
        setSelectedGenre,
    } = useSearchStore()

    const selectedValue =
        filterType === 'instrument' ? selectedInstrument : selectedGenre
    const setSelectedValue =
        filterType === 'instrument' ? setSelectedInstrument : setSelectedGenre

    const handleItemClick = (itemName: string) => {
        if (selectedValue === itemName) {
            setSelectedValue(null)
        } else {
            setSelectedValue(itemName)
        }
        setOpen(false)
    }

    return (
        <div className="relative">
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <button
                        className={`flex bg-white px-4 py-2 gap-2 border rounded-xl group relative ${
                            selectedValue ? 'border-sssyellow bg-yellow-50' : ''
                        }`}
                    >
                        <div className="flex">{menuTitle}</div>
                        <ChevronDown
                            className={`transition-transform duration-200 ${
                                open ? 'rotate-180' : ''
                            }`}
                        />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {menuContent.map((menuContentItem) => (
                        <DropdownMenuItem
                            key={menuContentItem.name}
                            onClick={() =>
                                handleItemClick(menuContentItem.name)
                            }
                            className={`cursor-pointer ${
                                selectedValue === menuContentItem.name
                                    ? 'bg-yellow-100 font-medium'
                                    : ''
                            }`}
                        >
                            <span>
                                {menuTitle === "instruments"
                                    ? menuContentItem.name && <Shape instrument={menuContentItem.name} width={24} />
                                    : ""}
                            </span>
                            {menuContentItem.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
