import { UserRole } from '@/app/generated/prisma/enums';
import {
    IconBarbell,
    IconCalendarEvent,
    IconCash,
    IconLayoutDashboard,
    IconUserCheck,
    IconUsers,
    IconUsersGroup,
} from '@tabler/icons-react';
import { ReactNode } from 'react';

interface Tab {
    title: string;
    icon: ReactNode;
    roles: UserRole[];
    href: string;
}

export const tabs: Tab[] = [
    {
        title: 'Dashboard',
        icon: <IconLayoutDashboard size={20} />,
        roles: [
            UserRole.WORKER,
            UserRole.ADMIN,
            UserRole.OWNER,
            UserRole.TRAINER,
        ],
        href: '/dashboard',
    },
    {
        title: 'Members',
        icon: <IconUsers size={20} />,
        roles: [UserRole.WORKER, UserRole.ADMIN, UserRole.OWNER],
        href: '/members',
    },
    {
        title: 'My Clients',
        icon: <IconUserCheck size={20} />,
        roles: [UserRole.TRAINER],
        href: '/my-clients',
    },
    {
        title: 'Staff',
        icon: <IconUsersGroup size={20} />,
        roles: [UserRole.ADMIN, UserRole.OWNER],
        href: '/staff',
    },
    {
        title: 'Equipment Log',
        icon: <IconBarbell size={20} />,
        roles: [
            UserRole.WORKER,
            UserRole.ADMIN,
            UserRole.OWNER,
            UserRole.TRAINER,
        ],
        href: '/equipment',
    },
    {
        title: 'Schedule',
        icon: <IconCalendarEvent size={20} />,
        roles: [
            UserRole.WORKER,
            UserRole.ADMIN,
            UserRole.OWNER,
            UserRole.TRAINER,
        ],
        href: '/schedule',
    },
    {
        title: 'Billing/Sales',
        icon: <IconCash size={20} />,
        roles: [UserRole.ADMIN, UserRole.OWNER],
        href: '/billing-sales',
    },
    {
        title: 'Earnings',
        icon: <IconCash size={20} />,
        roles: [UserRole.ADMIN, UserRole.OWNER, UserRole.TRAINER],
        href: '/earnings',
    },
];
