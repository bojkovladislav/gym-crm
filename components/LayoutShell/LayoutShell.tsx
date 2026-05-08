'use client';

import { AppShell, Group, Stack } from '@mantine/core';
import { Logo } from '../Logo';
import { Role, tabs } from '@/config/nav-tabs';
import { Tab } from '../Tab';
import { SignOut } from '@/features/SignOut';
import { usePathname } from 'next/navigation';

interface Props {
    children: React.ReactNode;
    userRole: Role | null;
}

export default function LayoutShell({ children, userRole }: Props) {
    const pathname = usePathname();

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
                <Group
                    justify='space-between'
                    pr='md'
                    pl='md'
                    align='center'
                    h='100%'
                >
                    <SignOut />
                    <Logo />
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p='md'>
                <Stack>
                    {tabs
                        .filter((tab) => tab.roles.includes(Role.OWNER)) // TODO use userRole!
                        .map(({ title, icon, href }) => (
                            <Tab
                                key={title}
                                highlighted={pathname === href}
                                title={title}
                                icon={icon}
                                href={href}
                            />
                        ))}
                </Stack>
            </AppShell.Navbar>

            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
}
