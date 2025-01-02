import { renderWithRouter } from '../lib/RenderWithRouter'
import SignInPage from '../../app/routes/sign-in.$'
import { screen } from '@testing-library/react'
import { useUser, useClerk, SignIn } from '@clerk/remix'

vi.mock('@clerk/remix', () => ({
    useUser: vi.fn(),
    useClerk: vi.fn(),
    SignIn: vi.fn(),
}))

const mockUserState = (isSignedIn: boolean, signOut = vi.fn()) => {
    vi.mocked(useUser).mockReturnValue({ isSignedIn } as never)
    vi.mocked(useClerk).mockReturnValue({ signOut } as never)
}

describe('Sign In route', () => {
    const mockSignOut = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    beforeEach(() => {
        mockUserState(false, mockSignOut)
        vi.mocked(SignIn).mockImplementation(() => (
            <div>Mocked SignIn Component</div>
        ))
    })

    it('should render the SignIn form from Clerk', () => {
        renderWithRouter(<SignInPage />)
        expect(screen.getByText('Mocked SignIn Component')).toBeInTheDocument()
    })
})
