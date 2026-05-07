import {
    IconUser,
    IconMail,
    IconShieldLock,
    IconTrash,
} from '@tabler/icons-react';
import { rem } from '@mantine/core';
import { PersonFormConfig } from '../PeopleManagement/PersonForm';
import { Action } from '../PeopleManagement/PersonActionMenu';
import { StaffMember } from './Staff';

export const tableHeaders = ['Name', 'Email', 'Role'];
export const fieldsToShow: (keyof StaffMember)[] = ['name', 'email', 'role'];

export const getStaffFields = (): PersonFormConfig[] => [
    {
        name: 'name',
        label: 'Full Name',
        inputType: 'text',
        icon: <IconUser style={{ width: rem(16) }} />,
        rules: { required: 'Required' },
    },
    {
        name: 'email',
        label: 'Work Email',
        inputType: 'text',
        icon: <IconMail style={{ width: rem(16) }} />,
        rules: { required: 'Required' },
    },
    {
        name: 'role',
        label: 'System Role',
        inputType: 'select',
        icon: <IconShieldLock style={{ width: rem(16) }} />,
        data: [
            { value: 'ADMIN', label: 'Administrator' },
            { value: 'WORKER', label: 'Worker' },
            { value: 'OWNER', label: 'Owner' },
        ],
        rules: { required: 'Please assign a role' },
    },
];

export const getStaffActions = (onDelete: (id: string) => void): Action[] => [
    {
        name: 'edit',
        label: 'Edit Permissions',
        icon: <IconShieldLock size={14} />,
        action: () => console.log('Editing permissions for'),
    },
    {
        name: 'delete',
        label: 'Remove Staff',
        icon: <IconTrash size={14} />,
        color: 'red',
        action: ((id: string | number) => onDelete(id as string)) as () => void,
    },
];
