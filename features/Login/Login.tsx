'use client';

import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Box,
} from '@mantine/core';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';

type Inputs = {
    email: string;
    password: string;
    rememberMe: boolean;
};

export default function Login() {
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
        console.log(data);
        await new Promise((res) => setTimeout(res, 1000));
        setLoading(false);
    };

    return (
        <Box
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Container size={420} my={40}>
                <Title ta='center' order={1} fw={900} c='blue.7'>
                    GYM FLOW
                </Title>
                <Text c='dimmed' size='sm' ta='center' mt={5}>
                    Management & Retention System
                </Text>

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

                        <Group justify='flex-end' mt='md'>
                            <Anchor
                                component='button'
                                type='button'
                                size='sm'
                                fw={500}
                                onClick={() =>
                                    console.log('Redirect to forgot password')
                                }
                            >
                                Forgot password?
                            </Anchor>
                        </Group>

                        <Button
                            type='submit'
                            fullWidth
                            mt='xl'
                            size='md'
                            loading={loading}
                            variant='filled'
                            color='blue'
                        >
                            Sign in
                        </Button>
                    </form>
                </Paper>

                <Text ta='center' mt='md' size='xs' c='dimmed'>
                    &copy; 2026 Gym Flow CRM — Qualification Project
                </Text>
            </Container>
        </Box>
    );
}
