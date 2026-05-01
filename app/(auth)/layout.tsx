import { Logo } from '@/components/Logo';
import { Box, Container, Text } from '@mantine/core';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Container size={420} my={40}>
                <Logo />

                <Text c='dimmed' size='sm' ta='center' mt={5}>
                    Management & Retention System
                </Text>

                {children}

                <Text ta='center' mt='md' size='xs' c='dimmed'>
                    &copy; 2026 Gym Flow CRM — Qualification Project
                </Text>
            </Container>
        </Box>
    );
}
