import { it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import Shape from '../../app/components/Shape'
import '@testing-library/jest-dom/vitest'

describe('Shape', () => {
    it('should render the Shape with the name and width provided as props', () => {
        render(<Shape instrument="drums" width={200} />)
        // screen.debug()
        const img = screen.getByRole('img')

        expect(img).toBeInTheDocument()
        expect(img).toHaveProperty(
            'src',
            expect.stringContaining('shape_drums.svg')
        )
        expect(img).toHaveProperty('width', 200)
        expect(img).toHaveProperty('alt', 'drums shape logo')
    })
})
