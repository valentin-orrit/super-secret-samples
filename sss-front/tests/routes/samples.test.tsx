/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from 'vitest'
import { useToast } from '../../app/hooks/use-toast'

vi.mock('../../app/hooks/use-toast')
vi.mock('react-router', () => ({
    useLoaderData: () => ({
        samples: [],
        instruments: [],
        genres: [],
        tags: [],
    }),
}))

describe('SamplesPage', () => {
    const mockToast = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
        ;(useToast as any).mockReturnValue({ toast: mockToast })
    })
})
