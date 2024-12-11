import { Slider } from './ui/slider'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Volume2 } from 'lucide-react'

export function VolumeSliderMenu({ volume }: { volume: number }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex">
                <Volume2 size={30} strokeWidth={2} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="my-5 rounded-xl text-sssdarkblue">
                <DropdownMenuItem>
                    <Slider defaultValue={[volume]} max={100} step={1} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
