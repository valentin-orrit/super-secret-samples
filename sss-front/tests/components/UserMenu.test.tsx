import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import UserMenu from '../../app/components/UserMenu'
import { BrowserRouter } from 'react-router-dom'
import { useUser, useClerk } from '@clerk/remix'

vi.mock('@clerk/remix', () => ({
    useUser: vi.fn(),
    useClerk: vi.fn(),
}))

// Create a wrapper component with BrowserRouter for Link components
const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter })
}

describe('UserMenu', () => {
    const mockSignOut = vi.fn()

    const setupSignedIn = () => {
        vi.mocked(useUser).mockReturnValue({
            isSignedIn: true,
        } as never)

        vi.mocked(useClerk).mockReturnValue({
            signOut: mockSignOut,
        } as never)
    }

    const setupSignedOut = () => {
        vi.mocked(useUser).mockReturnValue({
            isSignedIn: false,
        } as never)
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('when user is signed in', () => {
        beforeEach(() => {
            setupSignedIn()
        })

        it('renders user menu button with dropdown', () => {
            renderWithRouter(<UserMenu />)
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
            expect(button).toHaveAttribute('aria-expanded', 'false')
        })

        it('shows menu items when clicked', async () => {
            const user = userEvent.setup()
            renderWithRouter(<UserMenu />)
            const button = screen.getByRole('button')
            await user.click(button)

            expect(screen.getByText('settings')).toBeInTheDocument()
            expect(screen.getByText('upload samples')).toBeInTheDocument()
            expect(screen.getByText('request samples')).toBeInTheDocument()
            expect(screen.getByText('Sign Out')).toBeInTheDocument()
        })

        it('has correct navigation links', async () => {
            const user = userEvent.setup()
            renderWithRouter(<UserMenu />)
            const button = screen.getByRole('button')
            await user.click(button)

            const uploadLink = screen.getByText('upload samples').closest('a')
            const requestLink = screen.getByText('request samples').closest('a')

            expect(uploadLink).toHaveAttribute('href', '/sample-upload')
            expect(requestLink).toHaveAttribute('href', '/sample-request')
        })

        it('calls signOut when sign out button is clicked', async () => {
            const user = userEvent.setup()
            renderWithRouter(<UserMenu />)
            const button = screen.getByRole('button')
            await user.click(button)

            const signOutButton = screen.getByText('Sign Out')
            await user.click(signOutButton)

            expect(mockSignOut).toHaveBeenCalledTimes(1)
        })
    })

    describe('when user is signed out', () => {
        beforeEach(() => {
            setupSignedOut()
        })

        it('renders sign in link instead of menu', () => {
            renderWithRouter(<UserMenu />)

            const signInLink = screen.getByText('sign in')
            expect(signInLink).toBeInTheDocument()

            const menuButton = screen.queryByRole('button')
            expect(menuButton).not.toBeInTheDocument()
        })

        it('has correct link to sign in page', () => {
            renderWithRouter(<UserMenu />)

            const signInLink = screen.getByRole('link')
            expect(signInLink).toHaveAttribute('href', '/sign-in')
        })
    })

    describe('error handling', () => {
        it('handles sign out failure gracefully', async () => {
            const user = userEvent.setup()
            setupSignedIn()
            mockSignOut.mockRejectedValueOnce(new Error('Sign out failed'))

            renderWithRouter(<UserMenu />)
            const button = screen.getByRole('button')
            await user.click(button)

            const signOutButton = screen.getByText('Sign Out')
            await user.click(signOutButton)

            expect(mockSignOut).toHaveBeenCalled()
        })
    })
})
