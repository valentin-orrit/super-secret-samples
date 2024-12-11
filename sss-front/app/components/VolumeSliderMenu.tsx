import { Slider } from './ui/slider'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useVolumeStore } from '../store'
import { Volume2 } from 'lucide-react'

export function VolumeSliderMenu() {
    const { volume, setVolume } = useVolumeStore()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex">
                <Volume2 size={30} strokeWidth={2} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="my-5 rounded-xl text-sssdarkblue">
                <DropdownMenuItem>
                    <Slider
                        value={[volume]}
                        onValueChange={(value) => setVolume(value[0])}
                        max={100}
                        step={1}
                    />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
