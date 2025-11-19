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
import { toast } from "sonner"
import { useEffect, useState } from 'react'

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const error = url.searchParams.get('error')
    const isShowroomMode = process.env.SHOWROOM_MODE === 'true'

    // Skip auth check in showroom mode
    if (isShowroomMode) {
        console.log('✅ Showroom mode - bypassing auth')
        return {
            authenticated: true,
            error,
        }
    }

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
    const [password, setPassword] = useState('')
    const [agreedToTerms, setAgreedToTerms] = useState(false)
    const isSubmitting = navigation.state === 'submitting'

    useEffect(() => {
        if (error === 'invalid-password') {
            toast.error('invalid password')
            setPassword('')
        }
    }, [error, location.key])

    if (!authenticated) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-sssdarkblue text-sssdarkblue p-4">
                <div className="flex m-4">
                    <div id="shapes-top" className="flex flex-row">
                        <div className="animate-in slide-in-from-bottom spin-in-3 duration-300 w-18 sm:w-20">
                            <Shape instrument="bass"/>
                        </div>
                        <div className="animate-in slide-in-from-bottom spin-in-6 duration-300 w-18 sm:w-20">
                            <Shape instrument="drums"/>
                        </div>
                    </div>
                    <div id="shapes-bot" className="flex flex-row">
                        <div className="animate-in slide-in-from-bottom spin-in-12 duration-500 w-18 sm:w-20">
                            <Shape instrument="synths"/>
                        </div>
                        <div className="animate-in slide-in-from-bottom spin-in-45 duration-700 w-18 sm:w-20">
                            <Shape instrument="percs"/>
                        </div>
                        <div className="animate-in slide-in-from-bottom spin-in-90 duration-1000 w-18 sm:w-20">
                            <Shape instrument="pads"/>
                        </div>
                    </div>
                </div>
                <Card className="w-full max-w-md z-50 animate-in zoom-in-75">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-lg sm:text-2xl font-bold text-center text-sssblue">
                            super secret <span className="text-sssred">samples</span>
                        </CardTitle>
                        <CardDescription className="text-center text-sssdarkblue text-xs sm:text-sm">
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
                                    className="w-full tracking-widest"
                                />
                            </div>

                            <div className="flex items-start space-x-3 pt-4">
                                <Checkbox
                                    id="terms"
                                    checked={agreedToTerms}
                                    onCheckedChange={(checked) =>
                                        setAgreedToTerms(checked as boolean)
                                    }
                                    className="mt-1 relative bottom-0.5"
                                />
                                <label
                                    htmlFor="terms"
                                    className="text-xs sm:text-sm leading-relaxed cursor-pointer"
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