import Library, { loader, meta } from '../../app/routes/library'
import { render } from '@testing-library/react'
import { redirect } from '@remix-run/node'
import { getAuth } from '@clerk/remix/ssr.server'

vi.mock('@clerk/remix/ssr.server', () => ({
    getAuth: vi.fn(),
}))

vi.mock('@remix-run/node', async () => ({
    ...(await vi.importActual('@remix-run/node')),
    redirect: vi.fn(),
}))

describe('Library Route', () => {
    it('should return correct meta information', () => {
        const result = meta({})
        expect(result).toEqual([
            { title: 'samples page - super secret samples' },
            { name: 'description', content: 'browse samples!' },
        ])
    })

    it('should redirect to /sign-in if user is not authenticated', async () => {
        vi.mocked(getAuth).mockResolvedValueOnce({ userId: null })

        const result = await loader({} as never)
        expect(redirect).toHaveBeenCalledWith('/sign-in')
        expect(result).toEqual(undefined)
    })

    it('should return an empty object if user is authenticated', async () => {
        vi.mocked(getAuth).mockResolvedValueOnce({ userId: 'user_123' })

        const result = await loader({} as never)
        expect(result).toEqual({})
    })

    it('should render the library page', () => {
        const { getByText } = render(<Library />)
        expect(getByText('library page')).toBeInTheDocument()
    })
})
