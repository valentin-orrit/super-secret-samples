import { it, expect, describe, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { VolumeSliderMenu } from '../../app/components/VolumeSliderMenu'
import '@testing-library/jest-dom/vitest'
import { useVolumeStore } from '../../app/store'

// Mocking the Zustand store
vi.mock('../../app/store', () => ({
    useVolumeStore: vi.fn(),
}))

describe('VolumeSliderMenu', () => {
    // Reset Zustand mock
    beforeEach(() => {
        useVolumeStore.mockReturnValue({
            volume: 40,
            setVolume: vi.fn(),
        })
    })

    it('should render the VolumeSliderMenu component correctly', () => {
        render(<VolumeSliderMenu />)
        const button = screen.getByRole('button')

        expect(button).toBeInTheDocument()
        expect(button).toHaveAttribute('aria-expanded', 'false')
        expect(button).toHaveAttribute('data-state', 'closed')

        // Simulate a click on the button
        // fireEvent.click(button)
        // expect(button).toHaveAttribute('data-state', 'open')
        // screen.debug()
    })
})
