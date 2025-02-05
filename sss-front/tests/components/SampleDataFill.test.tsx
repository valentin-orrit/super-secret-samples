import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import SampleDataFill from '../../app/components/SampleDataFill'

// Carousel Mocks need for shadcn Carousel
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

class IntersectionObserver {
    observe = vi.fn()
    disconnect = vi.fn()
    unobserve = vi.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserver,
})

class ResizeObserver {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
}

Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: ResizeObserver,
})

// Files to drop
const audioFile1 = new File(['audio content'], 'test1.wav', {
    type: 'audio/wav',
    lastModified: Date.now(),
})
const audioFile2 = new File(['audio content'], 'test2.wav', {
    type: 'audio/wav',
    lastModified: Date.now(),
})

const samples = [audioFile1, audioFile2]

const renderWithRouter = (
    ui: React.ReactElement,
    route = '/sample-upload/fill-sample-data'
) => {
    const router = createMemoryRouter(
        [{ path: '/sample-upload/fill-sample-data', element: ui }],
        { initialEntries: [route] }
    )
    return render(<RouterProvider router={router} />)
}

describe('SampleDataFill', () => {
    it('should render the error message if samples array is empty', () => {
        renderWithRouter(
            <SampleDataFill
                samples={[]}
                instruments={[]}
                genres={[]}
                tags={[]}
            />
        )

        expect(screen.getByText(/upload samples/i)).toBeInTheDocument()
    })

    it('should render the samples data fill form if samples array contains samples', () => {
        renderWithRouter(
            <SampleDataFill
                samples={samples}
                instruments={[]}
                genres={[]}
                tags={[]}
            />
        )

        samples.forEach((sample, index) => {
            expect(
                screen.getByText(
                    new RegExp(`sample #${index + 1}/${samples.length}`, 'i')
                )
            ).toBeInTheDocument()
            expect(
                screen.getByDisplayValue(sample.name.slice(0, -4))
            ).toBeInTheDocument()
        })
    })
})
