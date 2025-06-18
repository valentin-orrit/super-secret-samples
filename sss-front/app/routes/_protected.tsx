import {
    Outlet,
    useLoaderData,
    Form,
    useLocation,
    useNavigation,
} from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'
import { requireSiteAuth } from '../lib/authStore.server'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../components/ui/card'
import { useToast } from '../hooks/use-toast'
import { useEffect, useState } from 'react'

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const error = url.searchParams.get('error')
    const authData = await requireSiteAuth(request)

    return {
        ...authData,
        error,
    }
}

export default function ProtectedServerLayout() {
    const { authenticated, error } = useLoaderData<typeof loader>()
    const location = useLocation()
    const navigation = useNavigation()
    const { toast } = useToast()
    const [password, setPassword] = useState('')
    const isSubmitting = navigation.state === 'submitting'

    useEffect(() => {
        if (error === 'invalid-password') {
            toast({
                title: 'Access Denied',
                description: 'Invalid password. Please try again.',
                variant: 'destructive',
            })
            setPassword('')
        }
    }, [error, toast])

    if (!authenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sssoffwhite p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">
                            Site Access
                        </CardTitle>
                        <CardDescription className="text-center">
                            Enter the password to access the site
                        </CardDescription>
                    </CardHeader>
                    <Form method="post" action="/auth/site">
                        <input
                            type="hidden"
                            name="from"
                            value={location.pathname}
                        />
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    className="w-full"
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Checking...' : 'Access Site'}
                            </Button>
                        </CardFooter>
                    </Form>
                </Card>
            </div>
        )
    }

    return <Outlet />
}
