import { useState } from 'react'
import { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '../components/ui/form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export const meta: MetaFunction = () => {
    return [
        { title: 'samples page - super secret samples' },
        { name: 'description', content: 'log to your profile!' },
    ]
}

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
})

const signUpSchema = z
    .object({
        email: z.string().email('Invalid email address'),
        password: z
            .string()
            .min(6, 'Password must be at least 6 characters long'),
        confirmPassword: z
            .string()
            .min(6, 'Confirm Password must be at least 6 characters long'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'],
    })

export default function LoginPage() {
    const [action, setAction] = useState('login')

    const form = useForm({
        resolver: zodResolver(action === 'login' ? loginSchema : signUpSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    function onSubmit(values: z.infer<typeof loginSchema>) {
        console.log(values)
    }

    return (
        <div className="flex flex-col items-center mt-40">
            <Card className="w-full max-w-md border rounded-2xl p-8">
                <CardHeader className="flex font-bold text-sssorange text-2xl text-center ml-2">
                    <CardTitle className="text-center">
                        {action === 'login' ? 'login' : 'sign up'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sssdarkblue">
                                            email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="enter your email"
                                                className="text-xs font-thin"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between">
                                            <FormLabel className="text-sssdarkblue">
                                                password
                                            </FormLabel>

                                            {action === 'login' ? (
                                                <div className="flex items-center justify-between text-xs">
                                                    <Link
                                                        to="/"
                                                        className="text-sssaccentgray underline hover:text-sssblue"
                                                    >
                                                        Forgot password?
                                                    </Link>
                                                </div>
                                            ) : null}
                                        </div>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="enter your password"
                                                className="text-xs font-thin"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {action !== 'login' && (
                                <FormField
                                    name="confirmPassword"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Confirm Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Confirm your password"
                                                    className="text-xs font-thin"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            <Button
                                type="submit"
                                className="w-full text-sssoffwhite bg-sssblue hover:bg-teal-500 rounded-full"
                            >
                                {action === 'login' ? 'login' : 'sign up'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
