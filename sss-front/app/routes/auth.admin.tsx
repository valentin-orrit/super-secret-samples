import type { ActionFunctionArgs } from 'react-router'
import { redirect } from 'react-router'
import jwt from 'jsonwebtoken'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-to-a-secure-secret'

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    const password = formData.get('password') as string
    const from = (formData.get('from') as string) || '/sample-upload'

    if (password === ADMIN_PASSWORD) {
        const token = jwt.sign({ type: 'admin' }, JWT_SECRET, {
            expiresIn: '7d',
        })

        return redirect(from, {
            headers: {
                'Set-Cookie': `auth_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`,
            },
        })
    }

    // If failed, redirect back with error
    return redirect(from)
}

export async function loader() {
    // This route only handles POST requests
    return redirect('/')
}
