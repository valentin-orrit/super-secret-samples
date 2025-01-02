import { screen } from '@testing-library/react'
import { useUser, useClerk } from '@clerk/remix'
import Navbar from '../../app/components/Navbar'
import { renderWithMemoryRouter } from '../lib/RenderWithRouter'

vi.mock('@clerk/remix', () => ({
    useUser: vi.fn(),
    useClerk: vi.fn(),
}))

const mockUserState = (isSignedIn: boolean, signOut = vi.fn()) => {
    vi.mocked(useUser).mockReturnValue({ isSignedIn } as never)
    vi.mocked(useClerk).mockReturnValue({ signOut } as never)
}

describe('Navbar', () => {
    const mockSignOut = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('when user is signed in', () => {
        beforeEach(() => {
            mockUserState(true, mockSignOut)
        })

        it('should render Navbar with all its elements', () => {
            renderWithMemoryRouter(<Navbar />, '/samples')
            const samplesLink = screen.getByRole('link', { name: /samples/i })
            const libraryLink = screen.getByRole('link', { name: /library/i })
            const userMenu = screen.getAllByRole('button')[0]
            const volumeSliderMenu = screen.getAllByRole('button')[1]

            expect(screen.getByAltText('website logo')).toBeInTheDocument()
            expect(samplesLink).toBeInTheDocument()
            expect(libraryLink).toBeInTheDocument()
            expect(userMenu).toHaveAttribute('data-state', 'closed')
            expect(volumeSliderMenu).toHaveAttribute('data-state', 'closed')
        })

        it('should have active state for samples link', () => {
            renderWithMemoryRouter(<Navbar />, '/samples')
            const samplesLink = screen.getByRole('link', { name: /samples/i })
            const libraryLink = screen.getByRole('link', { name: /library/i })

            expect(samplesLink).toHaveClass('text-sssorange')
            expect(libraryLink).not.toHaveClass('text-sssorange')
        })

        it('should have active state for library link', () => {
            renderWithMemoryRouter(<Navbar />, '/library')
            const samplesLink = screen.getByRole('link', { name: /samples/i })
            const libraryLink = screen.getByRole('link', { name: /library/i })

            expect(samplesLink).not.toHaveClass('text-sssorange')
            expect(libraryLink).toHaveClass('text-sssorange')
        })
    })

    describe('when user is signed out', () => {
        beforeEach(() => {
            mockUserState(false, mockSignOut)
        })

        it('should render sign in link', () => {
            renderWithMemoryRouter(<Navbar />, '/samples')
            const signInLink = screen.getByRole('link', { name: /sign/i })

            expect(signInLink).toHaveTextContent('sign in')
        })
    })
})
