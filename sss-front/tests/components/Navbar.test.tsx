import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useUser, useClerk } from '@clerk/remix'
import Navbar from '../../app/components/Navbar'

vi.mock('@clerk/remix', () => ({
    useUser: vi.fn(),
    useClerk: vi.fn(),
}))

// Create a wrapper component with MemoryRouter for NavLink components
const renderWithRouter = (ui: React.ReactElement, route: string) => {
    return render(ui, {
        wrapper: ({ children }) => (
            <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        ),
    })
}

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
            renderWithRouter(<Navbar />, '/samples')
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
            renderWithRouter(<Navbar />, '/samples')
            const samplesLink = screen.getByRole('link', { name: /samples/i })
            const libraryLink = screen.getByRole('link', { name: /library/i })

            expect(samplesLink).toHaveClass('text-sssorange')
            expect(libraryLink).not.toHaveClass('text-sssorange')
        })

        it('should have active state for library link', () => {
            renderWithRouter(<Navbar />, '/library')
            const samplesLink = screen.getByRole('link', { name: /samples/i })
            const libraryLink = screen.getByRole('link', { name: /library/i })

            expect(samplesLink).not.toHaveClass('text-sssorange')
            expect(libraryLink).toHaveClass('text-sssorange')
        })
    })
})
