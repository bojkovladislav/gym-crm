'use client';

import { authClient } from '@/lib/auth-client';

export default function MockSignUp() {
    const handleSignUp = async () => {
        await authClient.signUp.email(
            {
                email: 'bojko.vladislav16@gmail.com',
                password: 'password123',
                name: 'Vlad Boiko',
                callbackURL: '/dashboard',
            },
            {
                onRequest: (ctx) => {
                    console.log('Signing up...');
                },
                onSuccess: (ctx) => {
                    console.log(
                        'Sign-up successful, session established:',
                        ctx.data,
                    );
                    // Redirect user automatically
                    window.location.href = '/dashboard';
                },
                onError: (ctx) => {
                    console.error('Sign-up error:', ctx.error.message);
                    alert(`Error: ${ctx.error.message}`);
                },
            },
        );
    };

    return <div onClick={handleSignUp}>Sign up</div>;
}
