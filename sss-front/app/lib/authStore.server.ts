import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-to-a-secure-secret'

interface TokenPayload {
    type: 'site' | 'admin'
    iat: number
    exp: number
}

export function parseCookies(
    cookieHeader: string | null
): Record<string, string> {
    if (!cookieHeader) return {}

    return cookieHeader.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=')
        if (key && value) {
            acc[key] = decodeURIComponent(value)
        }
        return acc
    }, {} as Record<string, string>)
}

export function checkSiteAuth(request: Request): boolean {
    const cookies = parseCookies(request.headers.get('cookie'))
    const token = cookies.auth_token

    if (!token) return false

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload
        return decoded.type === 'site' || decoded.type === 'admin'
    } catch {
        return false
    }
}

export function checkAdminAuth(request: Request): boolean {
    const cookies = parseCookies(request.headers.get('cookie'))
    const token = cookies.auth_token

    if (!token) return false

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload
        return decoded.type === 'admin'
    } catch {
        return false
    }
}

export async function requireSiteAuth(request: Request) {
    const isAuthenticated = checkSiteAuth(request)
    return { authenticated: isAuthenticated }
}

export async function requireAdminAuth(request: Request) {
    const isAuthenticated = checkAdminAuth(request)
    return { authenticated: isAuthenticated }
}
