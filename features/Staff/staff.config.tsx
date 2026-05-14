import {
    IconUser,
    IconMail,
    IconShieldLock,
    IconTrash,
    IconCoin,
    IconCash,
} from '@tabler/icons-react';
import { StaffMember } from './Staff';
import { BaseFormConfig } from '@/components/ActionForm/ActionForm';
import { Action } from '../ActionMenu/ActionMenu';
import { UserRole } from '@/app/generated/prisma/enums';

export const tableHeaders = ['Name', 'Email', 'Role'];
export const fieldsToShow: (keyof StaffMember)[] = ['name', 'email', 'role'];

export const getStaffFields = (isEdit: boolean = false): BaseFormConfig[] => {
    const fields: BaseFormConfig[] = [
        {
            name: 'name',
            label: 'Full Name',
            inputType: 'text',
            icon: <IconUser size={16} />,
            placeholder: 'Enter full name',
            rules: { required: 'Name is required' },
        },
        {
            name: 'email',
            label: 'Email',
            inputType: 'text',
            icon: <IconMail size={16} />,
            placeholder: 'example@email.com',
            rules: { required: 'Email is required' },
        },
        {
            name: 'role',
            label: 'Role',
            inputType: 'select',
            placeholder: 'Select a role',
            data: [
                { value: 'ADMIN', label: 'Admin' },
                { value: 'WORKER', label: 'Worker' },
                { value: 'TRAINER', label: 'Trainer' },
            ],
            rules: { required: 'Role is required' },
        },
        {
            name: 'baseSalary',
            label: 'Base Salary ($)',
            inputType: 'number',
            icon: <IconCoin size={16} />,
            placeholder: 'e.g. 1500',
            rules: {
                required: 'Base salary is required',
                min: { value: 0, message: 'Salary cannot be negative' },
            },
        },
        {
            name: 'sessionRate',
            label: 'Session Rate ($)',
            inputType: 'number',
            icon: <IconCash size={16} />,
            placeholder: 'e.g. 25',
        },
    ];

    if (!isEdit) {
        fields.push({
            name: 'password',
            label: 'Password',
            inputType: 'password',
            rules: {
                required: 'Password is required',
                minLength: { value: 8, message: 'At least 8 characters' },
            },
            placeholder: 'Enter password',
        });
    }

    return fields;
};

export const getStaffActions = (onDelete: (id: string) => void): Action[] => [
    {
        name: 'edit',
        label: 'Edit Permissions',
        icon: <IconShieldLock size={14} />,
        action: () => console.log('Editing permissions for'),
        permissions: [UserRole.OWNER, UserRole.ADMIN],
    },
    {
        name: 'delete',
        label: 'Remove Staff',
        icon: <IconTrash size={14} />,
        color: 'red',
        action: ((id: string | number) => onDelete(id as string)) as () => void,
        permissions: [UserRole.OWNER],
    },
];
