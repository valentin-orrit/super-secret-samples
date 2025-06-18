import type { ActionFunctionArgs } from 'react-router'
import { redirect } from 'react-router'

export async function action({ request }: ActionFunctionArgs) {
    // Clear the auth cookie
    return new Response(null, {
        status: 302,
        headers: {
            Location: '/',
            'Set-Cookie':
                'auth_token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0',
        },
    })
}

export async function loader() {
    // Redirect to home if accessed via GET
    return redirect('/')
}
