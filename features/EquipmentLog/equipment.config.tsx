import { BaseFormConfig } from '@/components/ActionForm/ActionForm';
import { Role } from '@/config/nav-tabs';
import {
    IconBarbell,
    IconCategory,
    IconEdit,
    IconHistory,
    IconInfoCircle,
    IconMapPin,
    IconNumbers,
    IconTools,
    IconTrash,
} from '@tabler/icons-react';
import { Action } from '../ActionMenu/ActionMenu';
import { Equipment } from './EquipmentLog';

export const equipmentInputs: BaseFormConfig[] = [
    {
        name: 'name',
        label: 'Equipment Name',
        inputType: 'text',
        placeholder: 'e.g., Matrix Treadmill T5',
        icon: <IconBarbell size={18} />,
        rules: { required: 'Name is required' },
    },
    {
        name: 'category',
        label: 'Category',
        inputType: 'select',
        placeholder: 'Select a category',
        icon: <IconCategory size={18} />,
        data: [
            { value: 'CARDIO', label: 'Cardio' },
            { value: 'STRENGTH', label: 'Strength' },
            { value: 'FREE_WEIGHTS', label: 'Free Weights' },
            { value: 'RECOVERY', label: 'Recovery/Massage' },
        ],
        rules: { required: 'Please select a category' },
    },
    {
        name: 'serialNumber',
        label: 'Serial Number',
        inputType: 'text',
        placeholder: 'Unique ID or Serial',
        icon: <IconNumbers size={18} />,
        rules: { required: 'Please fill out the serial number field' },
    },
    {
        name: 'location',
        label: 'Gym Location',
        inputType: 'text',
        placeholder: 'e.g., Main Floor, Zone B',
        icon: <IconMapPin size={18} />,
        rules: { required: 'Please out the location field' },
    },
];

export const getEquipmentActions = (
    onDelete: (id: string) => void,
): Action[] => [
    {
        name: 'edit',
        label: 'Edit Equipment',
        icon: <IconEdit size={14} />,
        action: () => {},
    },
    {
        name: 'details',
        label: 'View Details',
        icon: <IconInfoCircle size={14} />,
        action: () => {},
    },
    {
        name: 'maintenance',
        label: 'Maintenance Logs',
        icon: <IconHistory size={14} />,
        action: () => {},
    },
    {
        name: 'report',
        label: 'Request Repair',
        icon: <IconTools size={14} />,
        action: () => {},
    },
    {
        name: 'delete',
        label: 'Delete Equipment',
        icon: <IconTrash size={14} />,
        color: 'red',
        action: ((id: string | number) => onDelete(id as string)) as () => void,
        permissions: [Role.ADMIN, Role.OWNER],
    },
];
