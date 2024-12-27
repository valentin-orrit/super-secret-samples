import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useUser, useClerk } from '@clerk/remix'
import Navbar from '../../app/components/Navbar'

vi.mock('@clerk/remix', () => ({
    useUser: vi.fn(),
    useClerk: vi.fn(),
}))

// Create a wrapper component with BrowserRouter for Link components
const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter })
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
            renderWithRouter(<Navbar />)

            expect(screen.getByText('samples')).toBeInTheDocument()
        })
    })
})
