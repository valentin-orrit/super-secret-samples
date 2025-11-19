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

interface SampleFilterMenuProps {
    menuTitle: string
    menuContent: Instrument[] | Genre[]
    filterType: 'instrument' | 'genre'
}

export default function SampleFilterMenu({
                                             menuTitle,
                                             menuContent,
                                             filterType,
                                         }: SampleFilterMenuProps) {
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
                        className={`flex bg-white px-3 sm:px-4 pt-2 pb-1 sm:py-2 sm:gap-2 border rounded-xl group text-sm sm:text-lg relative ${
                            selectedValue ? 'border-sssyellow bg-yellow-50' : ''
                        }`}
                    >
                        <div className="flex pr-1 sm:pr-0">{menuTitle}</div>
                        <ChevronDown
                            className={`transition-transform relative sm:top-1 w-4 sm:w-8 duration-200 ${
                                open ? 'rotate-180' : ''
                            }`}
                        />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
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
                                    ? menuContentItem.name && <Shape instrument={menuContentItem.name} width={24}/>
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
