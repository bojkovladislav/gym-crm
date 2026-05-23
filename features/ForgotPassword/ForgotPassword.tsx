'use client';

import {
    Anchor,
    Box,
    Button,
    Group,
    Paper,
    Stack,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { authClient } from '@/lib/auth-client';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FormNotification } from '@/components/FormNotification';

export default function ForgotPassword() {
    type Inputs = {
        email: string;
    };

    const [successMessage, setSuccessMessage] = useState('');
    const [resendCounter, setResendCounter] = useState(0);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isLoading },
    } = useForm<Inputs>({
        defaultValues: {
            email: '',
        },
    });

    const email = watch('email');

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const { data: incomingData } =
                await authClient.requestPasswordReset({
                    email: data.email,
                    redirectTo: '/reset-password',
                });

            setResendCounter(30);

            setSuccessMessage(incomingData?.message as string);
        } catch (error) {
            console.log(error || 'Undefined Error');
        }
    };

    useEffect(() => {
        if (resendCounter <= 0) return;

        const interval = setInterval(() => {
            setResendCounter((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [resendCounter]);

    useEffect(() => {
        if (successMessage) {
            setSuccessMessage('');
        }
    }, [email]);

    return (
        <Paper withBorder shadow='xl' p={30} mt={30} radius='md'>
            <Stack justify='center' align='center' gap='sm'>
                <Title order={1} fw={900} c='blue.7' size='lg'>
                    RESET PASSWORD
                </Title>

                <Text c='dimmed' size='sm' ta='center'>
                    Enter your email address and we’ll send you a link to reset
                    your password.
                </Text>
            </Stack>

            <Box mt='lg'>
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

                    {successMessage && (
                        <FormNotification
                            type='success'
                            message={successMessage}
                        />
                    )}

                    <Group justify='space-between' mt='xl'>
                        <Anchor
                            component={Link}
                            href='/login'
                            size='sm'
                            c='dimmed'
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                            }}
                        >
                            <IconArrowLeft size={16} />
                            Back to login
                        </Anchor>

                        <Button
                            type='submit'
                            flex={1}
                            size='md'
                            loading={isLoading}
                            variant='filled'
                            color='blue'
                            disabled={resendCounter > 0}
                        >
                            <Group>
                                <Text>{`${successMessage ? 'Res' : 'S'}end code`}</Text>

                                {resendCounter > 0 && (
                                    <Text>{resendCounter}</Text>
                                )}
                            </Group>
                        </Button>
                    </Group>
                </form>
            </Box>
        </Paper>
    );
}
