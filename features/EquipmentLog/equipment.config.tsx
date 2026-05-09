import { BaseFormConfig } from '@/components/ActionForm/ActionForm';
import {
    IconBarbell,
    IconCategory,
    IconMapPin,
    IconNumbers,
} from '@tabler/icons-react';

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
