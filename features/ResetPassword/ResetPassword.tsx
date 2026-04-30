'use client';

import { Notification } from '@/components/Notification';
import { authClient } from '@/lib/auth-client';
import {
    Box,
    Button,
    Paper,
    PasswordInput,
    Stack,
    Text,
    ThemeIcon,
    Title,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface Props {
    token?: string;
}

export default function ResetPassword({ token }: Props) {
    type Inputs = {
        newPassword: string;
        confirmedNewPassword: string;
    };

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isLoading },
    } = useForm<Inputs>({
        defaultValues: {
            newPassword: '',
            confirmedNewPassword: '',
        },
    });

    const [newPassword, confirmedNewPassword] = watch([
        'newPassword',
        'confirmedNewPassword',
    ]);

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!token) {
            setErrorMessage('Unauthorized access! Please, try again later');

            return;
        }

        if (newPassword !== confirmedNewPassword) {
            setErrorMessage('Make sure your passwords match');

            return;
        }

        try {
            const { data: incomingData, error } =
                await authClient.resetPassword({
                    newPassword: data.newPassword,
                    token,
                });

            if (error) {
                setErrorMessage(error.message || '');
            }

            setSuccessMessage('You have successfully changed your password!');
        } catch (error) {
            setErrorMessage('Unexpected Error!');
        }
    };

    useEffect(() => {
        if (errorMessage) {
            setErrorMessage('');
        }
    }, [newPassword, confirmedNewPassword]);

    return (
        <Paper withBorder shadow='xl' p={30} mt={30} radius='md'>
            {successMessage ? (
                <Stack align='center' justify='center' gap='md' mt='xl'>
                    <ThemeIcon
                        size={80}
                        radius='xl'
                        color='green'
                        variant='light'
                    >
                        <IconCheck size={50} />
                    </ThemeIcon>

                    <Text size='lg' fw={500} ta='center' c='green'>
                        You have successfully changed your password
                    </Text>

                    <Button component={Link} href='/login' mt='md' size='md'>
                        Back to login
                    </Button>
                </Stack>
            ) : (
                <Stack>
                    <Stack justify='center' align='center' gap='sm'>
                        <Title order={1} fw={900} c='blue.7' size='lg'>
                            RESET PASSWORD
                        </Title>

                        <Text c='dimmed' size='sm' ta='center'>
                            Choose a new password for your account.
                        </Text>
                    </Stack>

                    <Box mt='lg'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name='newPassword'
                                control={control}
                                rules={{ required: 'Password is required' }}
                                render={({ field }) => (
                                    <PasswordInput
                                        label='New Password'
                                        placeholder='Your password'
                                        mt='md'
                                        error={errors.newPassword?.message}
                                        required
                                        {...field}
                                    />
                                )}
                            />

                            <Controller
                                name='confirmedNewPassword'
                                control={control}
                                rules={{
                                    required:
                                        'Please, confirm your new password',
                                }}
                                render={({ field }) => (
                                    <PasswordInput
                                        label='Confirm Password'
                                        placeholder='Your password'
                                        mt='md'
                                        error={
                                            errors.confirmedNewPassword?.message
                                        }
                                        required
                                        {...field}
                                    />
                                )}
                            />

                            {errorMessage && (
                                <Notification
                                    type='fail'
                                    message={errorMessage}
                                />
                            )}

                            <Button
                                type='submit'
                                fullWidth
                                mt='xl'
                                size='md'
                                loading={isLoading}
                                variant='filled'
                                color='blue'
                            >
                                Reset password
                            </Button>
                        </form>
                    </Box>
                </Stack>
            )}
        </Paper>
    );
}
