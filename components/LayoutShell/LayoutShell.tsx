'use client';

import { AppShell, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { Logo } from '../Logo';
import { Role, tabs } from '@/config/nav-tabs';
import Link from 'next/link';

interface Props {
    children: React.ReactNode;
}

export default function LayoutShell({ children }: Props) {
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
            }}
            padding='md'
        >
            <AppShell.Header>
                <Group justify='flex-end' pr='md' align='center' h='100%'>
                    <Logo />
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p='md'>
                {/* TODO: Create a list of my future CRM features, and render it here */}

                <Stack>
                    {tabs
                        .filter((tab) => tab.roles.includes(Role.ADMIN))
                        .map(({ title, icon, href }) => (
                            <Link href={href} key={title}>
                                <Group gap='lg'>
                                    <ThemeIcon
                                        size={50}
                                        radius='xl'
                                        color='blue'
                                        variant='light'
                                    >
                                        {icon}
                                    </ThemeIcon>

                                    <Text>{title}</Text>
                                </Group>
                            </Link>
                        ))}
                </Stack>
            </AppShell.Navbar>

            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
}
