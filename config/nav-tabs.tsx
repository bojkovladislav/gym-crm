import {
    IconBarbell,
    IconCalendarEvent,
    IconCash,
    IconLayoutDashboard,
    IconSettings,
    IconUsers,
    IconUsersGroup,
} from '@tabler/icons-react';
import { ReactNode } from 'react';

export enum Role {
    WORKER = 'WORKER',
    ADMIN = 'ADMIN',
    OWNER = 'OWNER',
}

interface Tab {
    title: string;
    icon: ReactNode;
    roles: Role[];
    href: string;
}

export const tabs: Tab[] = [
    {
        title: 'Dashboard',
        icon: <IconLayoutDashboard size={20} />,
        roles: [Role.WORKER, Role.ADMIN, Role.OWNER], // Shared among all roles
        href: '/dashboard',
    },
    {
        title: 'Members',
        icon: <IconUsers size={20} />,
        roles: [Role.WORKER, Role.ADMIN, Role.OWNER],
        href: '/members',
    },
    {
        title: 'Staff',
        icon: <IconUsersGroup size={20} />,
        roles: [Role.ADMIN, Role.OWNER],
        href: '/staff',
    },
    {
        title: 'Equipment Log',
        icon: <IconBarbell size={20} />,
        roles: [Role.WORKER, Role.ADMIN, Role.OWNER],
        href: '/equipment',
    },
    {
        title: 'Schedule',
        icon: <IconCalendarEvent size={20} />,
        roles: [Role.WORKER, Role.ADMIN, Role.OWNER],
        href: '/schedule',
    },
    {
        title: 'Billing/Sales',
        icon: <IconCash size={20} />,
        roles: [Role.ADMIN, Role.OWNER],
        href: '/billing',
    },
    {
        title: 'Settings',
        icon: <IconSettings size={20} />,
        roles: [Role.OWNER], // Restricted to Owner only
        href: '/settings',
    },
];
