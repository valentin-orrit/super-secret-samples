/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react'
import { vi } from 'vitest'
import SamplesPage from '../../app/routes/samples'
import { useUser } from '@clerk/remix'
import { useToast } from '../../app/hooks/use-toast'

vi.mock('@clerk/remix')
vi.mock('../../app/hooks/use-toast')
vi.mock('@remix-run/react', () => ({
    Link: ({ children, ...props }) => <a {...props}>{children}</a>,
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

    it('should show toast for recently signed in user', () => {
        const currentTime = Date.now()
        const recentSignIn = new Date(currentTime - 10 * 1000) // 10 seconds ago

        ;(useUser as any).mockReturnValue({
            user: {
                lastSignInAt: recentSignIn.toISOString(),
                emailAddresses: ['test@example.com'],
            },
        })

        render(<SamplesPage />)

        expect(mockToast).toHaveBeenCalledWith({
            title: 'Welcome back test@example.com!',
            description:
                'If you want exclusive samples, please send us a request.',
            duration: 5000,
            className: 'bg-white text-sssdarkblue text-sm rounded-xl',
            action: expect.anything(),
        })
    })

    it('should not show toast for old sign in', () => {
        const oldSignIn = new Date(Date.now() - 30 * 1000) // 30 seconds ago

        ;(useUser as any).mockReturnValue({
            user: {
                lastSignInAt: oldSignIn.toISOString(),
                emailAddresses: ['test@example.com'],
            },
        })

        render(<SamplesPage />)
        expect(mockToast).not.toHaveBeenCalled()
    })

    it('should not show toast when user is not signed in', () => {
        ;(useUser as any).mockReturnValue({ user: null })

        render(<SamplesPage />)
        expect(mockToast).not.toHaveBeenCalled()
    })
})
