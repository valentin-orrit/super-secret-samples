import { redirect } from 'react-router'

export async function action() {
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
    return redirect('/')
}
