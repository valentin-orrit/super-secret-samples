import { renderWithRouter } from '../lib/RenderWithRouter'
import SignUpPage from '../../app/routes/sign-up.$'
import { screen } from '@testing-library/react'
import { useUser, useClerk, SignUp } from '@clerk/remix'

vi.mock('@clerk/remix', () => ({
    useUser: vi.fn(),
    useClerk: vi.fn(),
    SignUp: vi.fn(),
}))

const mockUserState = (isSignedIn: boolean, signOut = vi.fn()) => {
    vi.mocked(useUser).mockReturnValue({ isSignedIn } as never)
    vi.mocked(useClerk).mockReturnValue({ signOut } as never)
}

describe('Sign Up route', () => {
    const mockSignOut = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    beforeEach(() => {
        mockUserState(false, mockSignOut)
        vi.mocked(SignUp).mockImplementation(() => (
            <div>Mocked SignIn Component</div>
        ))
    })

    it('should render the SignIn form from Clerk', () => {
        renderWithRouter(<SignUpPage />)
        expect(screen.getByText('Mocked SignIn Component')).toBeInTheDocument()
    })
})
