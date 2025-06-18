import { Outlet, useLoaderData, Form, useLocation } from 'react-router'
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

export async function loader({ request }: LoaderFunctionArgs) {
    return requireSiteAuth(request)
}

export default function ProtectedServerLayout() {
    const { authenticated } = useLoaderData<typeof loader>()
    const location = useLocation()

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
                                    required
                                    className="w-full"
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">
                                Access Site
                            </Button>
                        </CardFooter>
                    </Form>
                </Card>
            </div>
        )
    }

    return <Outlet />
}
