import {
    IconUser,
    IconMail,
    IconShieldLock,
    IconTrash,
} from '@tabler/icons-react';
import { StaffMember } from './Staff';
import { Role } from '@/config/nav-tabs';
import { BaseFormConfig } from '@/components/ActionForm/ActionForm';
import { Action } from '../ActionMenu/ActionMenu';

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
            ],
            rules: { required: 'Role is required' },
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
        permissions: [Role.OWNER, Role.ADMIN],
    },
    {
        name: 'delete',
        label: 'Remove Staff',
        icon: <IconTrash size={14} />,
        color: 'red',
        action: ((id: string | number) => onDelete(id as string)) as () => void,
        permissions: [Role.OWNER],
    },
];
