import {
    IconUser,
    IconCalendar,
    IconMail,
    IconCreditCard,
    IconCalendarClock,
    IconTrash,
    IconPhone,
    IconAdjustmentsAlt,
} from '@tabler/icons-react';
import { rem } from '@mantine/core';
import { BaseFormConfig } from '../../components/ActionForm/ActionForm';
import { Member } from './Members';
import { Role } from '@/config/nav-tabs';
import { Action } from '../ActionMenu/ActionMenu';

export const tableHeaders = [
    'Name',
    'Email',
    'Plan',
    'Status',
    'Visits',
    'Joined',
];
export const fieldsToShow: (keyof Member | 'plan')[] = [
    'name',
    'email',
    'plan',
    'status',
    'visits',
    'joinedAt',
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPersonFields = (plans: any[]): BaseFormConfig[] => [
    {
        name: 'name',
        label: 'Full Name',
        inputType: 'text',
        icon: <IconUser style={{ width: rem(16) }} />,
        placeholder: 'Enter full name',
        rules: { required: 'Required' },
    },
    {
        name: 'dob',
        label: 'Date of Birth',
        inputType: 'date',
        icon: <IconCalendar style={{ width: rem(16) }} />,
        placeholder: 'Select date of birth',
        rules: { required: 'Required' },
    },
    {
        name: 'email',
        label: 'Email',
        inputType: 'text',
        icon: <IconMail style={{ width: rem(16) }} />,
        placeholder: 'example@email.com',
        rules: {
            required: 'Required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid' },
        },
    },
    {
        name: 'phoneNumber',
        label: 'Phone Number',
        inputType: 'text',
        icon: <IconPhone style={{ width: rem(16) }} />,
        placeholder: '+1 (555) 123-4567',
        rules: {
            required: 'Required',
            pattern: {
                value: /^\+?[\d\s\-()]{7,15}$/,
                message: 'Invalid phone number',
            },
        },
    },
    {
        name: 'planId',
        label: 'Plan',
        inputType: 'select',
        placeholder: 'Select a plan',
        data: plans,
        rules: { required: 'Required' },
    },
    {
        name: 'autoRenew',
        label: 'Enable Auto-Renewal',
        inputType: 'checkbox',
    },
];

export const getPersonActions = (
    onDelete: (id: string) => void,
    checkIn: (id: string) => void,
): Action[] => [
    {
        name: 'edit',
        label: 'Edit Profile',
        icon: <IconUser size={14} />,
        action: () => {},
    },
    {
        name: 'billing',
        label: 'Manage Billing',
        icon: <IconCreditCard size={14} />,
        action: () => {},
    },
    {
        name: 'attendance',
        label: 'View Attendance',
        icon: <IconCalendarClock size={14} />,
        action: () => {},
    },
    {
        name: 'checkIn-simulation',
        label: 'Simulate Check In',
        icon: <IconAdjustmentsAlt size={14} />,
        action: ((id: string | number) => checkIn(id as string)) as () => void,
    },
    {
        name: 'delete',
        label: 'Delete Member',
        icon: <IconTrash size={14} />,
        color: 'red',
        action: ((id: string | number) => onDelete(id as string)) as () => void,
        permissions: [Role.ADMIN, Role.OWNER],
    },
];
