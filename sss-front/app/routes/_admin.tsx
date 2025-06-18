import { Outlet, useLoaderData, Form, useLocation } from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'
import { requireAdminAuth } from '../lib/authStore.server'
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
import { ShieldAlert } from 'lucide-react'

export async function loader({ request }: LoaderFunctionArgs) {
    return requireAdminAuth(request)
}

export default function AdminServerLayout() {
    const { authenticated } = useLoaderData<typeof loader>()
    const location = useLocation()

    if (!authenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sssoffwhite p-4">
                <Card className="w-full max-w-md border-red-200">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-center mb-2">
                            <ShieldAlert className="h-12 w-12 text-red-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-center">
                            Admin Access Required
                        </CardTitle>
                        <CardDescription className="text-center text-red-600">
                            This area requires admin authentication
                        </CardDescription>
                    </CardHeader>
                    <Form method="post" action="/auth/admin">
                        <input
                            type="hidden"
                            name="from"
                            value={location.pathname}
                        />
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Admin Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter admin password"
                                    required
                                    className="w-full"
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                type="submit"
                                className="w-full bg-red-600 hover:bg-red-700"
                            >
                                Access Admin Area
                            </Button>
                        </CardFooter>
                    </Form>
                </Card>
            </div>
        )
    }

    return <Outlet />
}
