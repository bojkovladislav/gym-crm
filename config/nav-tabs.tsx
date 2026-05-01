import {
    IconBarbell,
    IconCalendarEvent,
    IconCash,
    IconLayoutDashboard,
    IconSettings,
    IconUsers,
} from '@tabler/icons-react';
import { ReactNode } from 'react';

export enum Role {
    WORKER = 'worker',
    ADMIN = 'admin',
    OWNER = 'owner',
}

interface Tab {
    title: string;
    icon: ReactNode;
    roles: Role[]; // Updated to an array of roles
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
        roles: [Role.ADMIN, Role.OWNER],
        href: '/members',
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
