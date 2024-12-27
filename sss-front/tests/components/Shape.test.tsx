import { render, screen, cleanup } from '@testing-library/react'
import Shape from '../../app/components/Shape'

describe('Shape', () => {
    beforeEach(() => {
        cleanup()
    })

    it('should render the Shape with the name and width provided as props', () => {
        render(<Shape instrument="drums" width={300} />)
        const img = screen.getByRole('img')

        expect(img).toHaveProperty(
            'src',
            expect.stringContaining('shape_drums.svg')
        )
        expect(img).toHaveProperty('width', 300)
        expect(img).toHaveProperty('alt', 'drums shape logo')
    })

    it('should return default props if props are not specified', () => {
        render(<Shape />)
        const img = screen.getByRole('img')
        // screen.debug()

        expect(img).toHaveProperty('src', expect.stringMatching(/\.svg$/))
        expect(img).toHaveProperty('width', 200)
        expect(img).toHaveProperty('alt', expect.stringContaining('shape logo'))
    })
})
