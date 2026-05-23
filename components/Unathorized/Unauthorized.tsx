'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Center, Paper, Title, Text, Button, Stack, Box } from '@mantine/core';
import { IconLockSquareRoundedFilled } from '@tabler/icons-react';

export default function Unauthorized() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push('/login');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <Center style={{ height: '100vh', width: '100vw' }} p='md'>
            <Paper
                radius='md'
                p='xl'
                withBorder
                style={{ maxWidth: 420, width: '100%' }}
            >
                <Stack align='center' gap='md'>
                    <Box style={{ color: 'var(--mantine-color-red-6)' }}>
                        <IconLockSquareRoundedFilled size={54} />
                    </Box>

                    <Stack align='center' gap='xs'>
                        <Title order={3} ta='center'>
                            Session Expired
                        </Title>
                        <Text ta='center' size='sm'>
                            Your session has expired or you are unauthorized to
                            view this page. Please log in again.
                        </Text>
                    </Stack>

                    <Button
                        color='red'
                        fullWidth
                        onClick={() => router.push('/login')}
                    >
                        Go to Login
                    </Button>

                    <Text size='xs' c='dimmed' ta='center'>
                        Redirecting automatically in {countdown}s...
                    </Text>
                </Stack>
            </Paper>
        </Center>
    );
}
