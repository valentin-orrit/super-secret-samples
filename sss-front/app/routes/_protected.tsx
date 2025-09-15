import {
    Outlet,
    useLoaderData,
    Form,
    useLocation,
    useNavigation,
    Link,
} from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'
import { requireSiteAuth } from '~/lib/authStore.server'
import Shape from '../components/Shape'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Checkbox } from '~/components/ui/checkbox'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/components/ui/card'
import { useToast } from '~/hooks/use-toast'
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
    const [agreedToTerms, setAgreedToTerms] = useState(false)
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
            <div className="min-h-screen flex flex-col items-center justify-center bg-sssdarkblue text-sssdarkblue p-4">
                <div className="flex mb-8 w-44 sm:w-96">
                    <div id="shapes-top" className="flex flex-col sm:flex-row">
                        <Shape instrument="bass"/>
                        <Shape instrument="drums"/>
                    </div>
                    <div id="shapes-bot" className="flex flex-col sm:flex-row">
                        <Shape instrument="synths"/>
                        <Shape instrument="percs"/>
                        <Shape instrument="pads"/>
                    </div>
                </div>
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center text-sssblue">
                            super secret <span className="text-sssred">samples</span>
                        </CardTitle>
                        <CardDescription className="text-center text-sssdarkblue">
                            Enter the password to access the site
                        </CardDescription>
                    </CardHeader>
                    <Form method="post" action="/auth/site">
                        <input
                            type="hidden"
                            name="from"
                            value={location.pathname}
                        />
                        <CardContent className="space-y-4 text-sssdarkblue">
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

                            <div className="flex items-start space-x-3">
                                <Checkbox
                                    id="terms"
                                    checked={agreedToTerms}
                                    onCheckedChange={(checked) =>
                                        setAgreedToTerms(checked as boolean)
                                    }
                                    className="mt-1"
                                />
                                <label
                                    htmlFor="terms"
                                    className="text-sm leading-relaxed cursor-pointer"
                                >
                                    I agree to the{' '}
                                    <Link
                                        to="/terms-of-use"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sssblue hover:underline font-semibold"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Terms of Use
                                    </Link>
                                </label>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                type="submit"
                                className={`w-full font-bold transition-colors ${
                                    password && agreedToTerms
                                        ? 'hover:bg-sssyellow text-sssdarkblue bg-sssorange'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                                disabled={isSubmitting || !password || !agreedToTerms}
                            >
                                {isSubmitting ? 'Checking...' : 'Access Site'}
                            </Button>
                        </CardFooter>
                    </Form>
                </Card>
            </div>
        )
    }

    return <Outlet/>
}