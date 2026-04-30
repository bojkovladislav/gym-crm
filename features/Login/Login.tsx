'use client';

import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Group,
    Button,
} from '@mantine/core';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { Notification } from '@/components/Notification';

type Inputs = {
    email: string;
    password: string;
};

export default function Login() {
    const [errorMessage, setErrorMessage] = useState<string | undefined>();

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isLoading },
    } = useForm<Inputs>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const [email, password] = watch(['email', 'password']);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const { data: incomingData, error } = await authClient.signIn.email(
                {
                    email: data.email,
                    password: data.password,
                    callbackURL: '/dashboard',
                },
            );

            if (error) {
                console.error('Login failed:', error);

                setErrorMessage(error?.message);

                return;
            }
        } catch (err) {
            console.error('Unexpected error', err);
            setErrorMessage('Unexpected error');
        } finally {
        }
    };

    useEffect(() => {
        if (errorMessage) {
            setErrorMessage('');
        }
    }, [email, password]);

    return (
        <Paper withBorder shadow='xl' p={30} mt={30} radius='md'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name='email'
                    control={control}
                    rules={{ required: 'Email is required' }}
                    render={({ field }) => (
                        <TextInput
                            label='Work Email'
                            placeholder='example@gym.com'
                            error={errors.email?.message}
                            required
                            {...field}
                        />
                    )}
                />

                <Controller
                    name='password'
                    control={control}
                    rules={{ required: 'Password is required' }}
                    render={({ field }) => (
                        <PasswordInput
                            label='Password'
                            placeholder='Your password'
                            mt='md'
                            error={errors.password?.message}
                            required
                            {...field}
                        />
                    )}
                />

                {errorMessage && (
                    <Notification type='fail' message={errorMessage} />
                )}

                <Group justify='flex-end' mt='md'>
                    <Link href={'/forgot-password'}>
                        <Anchor
                            component='button'
                            type='button'
                            size='sm'
                            fw={500}
                        >
                            Forgot password?
                        </Anchor>
                    </Link>
                </Group>

                <Button
                    type='submit'
                    fullWidth
                    mt='xl'
                    size='md'
                    loading={isLoading}
                    variant='filled'
                    color='blue'
                >
                    Sign in
                </Button>
            </form>
        </Paper>
    );
}
