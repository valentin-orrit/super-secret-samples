import { render, screen } from '@testing-library/react'
import { VolumeSliderMenu } from '../../app/components/VolumeSliderMenu'

describe('VolumeSliderMenu', () => {
    it('should render the VolumeSliderMenu component correctly', () => {
        render(<VolumeSliderMenu />)
        const button = screen.getByRole('button')

        expect(button).toBeInTheDocument()
        expect(button).toHaveAttribute('aria-expanded', 'false')
        expect(button).toHaveAttribute('data-state', 'closed')
    })
})
