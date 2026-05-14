import { BaseFormConfig } from '@/components/ActionForm/ActionForm';
import {
    IconActivity,
    IconBarbell,
    IconCalendarEvent,
    IconCategory,
    IconClockPlay,
    IconClockStop,
    IconCurrencyDollar,
    IconEdit,
    IconHammer,
    IconHistory,
    IconInfoCircle,
    IconMapPin,
    IconNumbers,
    IconTools,
    IconTrash,
} from '@tabler/icons-react';
import { Action } from '../ActionMenu/ActionMenu';
import {
    EquipmentCategory,
    EquipmentStatus,
    UserRole,
} from '@/app/generated/prisma';

interface Category {
    value: EquipmentCategory;
    label: string;
}

interface Status {
    value: EquipmentStatus;
    label: string;
}

export const equipmentCategories: Category[] = [
    { value: 'CARDIO', label: 'Cardio' },
    { value: 'STRENGTH', label: 'Strength' },
    { value: 'FREE_WEIGHTS', label: 'Free Weights' },
    { value: 'RECOVERY', label: 'Recovery/Massage' },
];

export const equipmentStatuses: Status[] = [
    { value: 'OPERATIONAL', label: 'Operational' },
    { value: 'MAINTENANCE_REQUIRED', label: 'Maintenance Required' },
    { value: 'OUT_OF_ORDER', label: 'Out of Order' },
    { value: 'UNDER_MAINTENANCE', label: 'Under maintenance' },
];

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
        data: equipmentCategories,
        rules: { required: 'Please select a category' },
    },
    {
        name: 'status',
        label: 'Current Status',
        inputType: 'select',
        placeholder: 'Set equipment status',
        icon: <IconActivity size={18} />,
        data: equipmentStatuses,
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

export const maintenanceInputs: BaseFormConfig[] = [
    {
        name: 'title',
        label: 'Repair Title',
        inputType: 'text',
        placeholder: 'e.g., Replace Treadmill Belt',
        icon: <IconHammer size={18} />,
        rules: {
            required: 'Please provide a title for the maintenance',
        },
    },
    {
        name: 'date',
        label: 'Scheduled Date',
        inputType: 'date',
        placeholder: 'Pick a date for repair',
        minDate: new Date(),
        icon: <IconCalendarEvent size={18} />,
        rules: {
            required: 'A repair date is required',
        },
    },
    {
        name: 'startTime',
        label: 'Start Time',
        inputType: 'time',
        placeholder: 'Pick start time',
        icon: <IconClockPlay size={18} />,
        rules: {
            required: 'Start time is required',
        },
    },
    {
        name: 'finishTime',
        label: 'Finish Time',
        inputType: 'time',
        placeholder: 'Pick finish time',
        icon: <IconClockStop size={18} />,
        rules: {
            required: 'Finish time is required',
        },
    },
    {
        name: 'cost',
        label: 'Estimated Cost',
        inputType: 'number',
        placeholder: '0.00',
        icon: <IconCurrencyDollar size={18} />,
        rules: {
            required: 'Please enter the cost for financial tracking',
            min: { value: 0, message: 'Cost cannot be negative' },
        },
    },
];

export const getEquipmentActions = (
    onDelete: (id: string) => void,
    onMaintenanceRequest: () => void,
    currentEquipmentStatus: EquipmentStatus,
): Action[] => {
    const actions: Action[] = [
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
    ];

    if (currentEquipmentStatus !== EquipmentStatus.UNDER_MAINTENANCE) {
        actions.push({
            name: 'report',
            label: 'Request Repair',
            icon: <IconTools size={14} />,
            action: onMaintenanceRequest,
        });
    }

    actions.push(
        {
            name: 'maintenance',
            label: 'Maintenance Logs',
            icon: <IconHistory size={14} />,
            action: () => {},
        },

        {
            name: 'delete',
            label: 'Delete Equipment',
            icon: <IconTrash size={14} />,
            color: 'red',
            action: ((id: string | number) =>
                onDelete(id as string)) as () => void,
            permissions: [UserRole.ADMIN, UserRole.OWNER],
        },
    );

    return actions;
};
