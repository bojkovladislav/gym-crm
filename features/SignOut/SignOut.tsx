import { authClient } from '@/lib/auth-client';
import { Button, Text, Title } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/Modal/Modal';

export default function SignOut() {
    const [loading, setLoading] = useState(false);
    const [signOutAttempt, setSignOutAttempt] = useState(false);
    const router = useRouter();

    const onSignOut = () => {
        setSignOutAttempt(true);
    };

    const handleSignOut = async () => {
        try {
            setLoading(true);

            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push('/login');
                    },
                },
            });
        } catch (error) {
            throw new Error('Failed to Sign Out!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal
                opened={signOutAttempt}
                title='Sign Out'
                onClose={() => setSignOutAttempt(false)}
                confirmAction={handleSignOut}
            >
                <Title order={4} fw={500} mb='1rem'>
                    Are you sure you want to{' '}
                    <Text span c='red' fw={700} inherit>
                        Sign Out
                    </Text>
                    ?
                </Title>
            </Modal>

            <Button
                variant='light'
                color='red'
                onClick={onSignOut}
                leftSection={<IconLogout size={16} />}
                loading={loading}
            >
                Sign Out
            </Button>
        </>
    );
}
