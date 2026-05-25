import { useState, useEffect } from 'react';
import {
    createEquipmentAction,
    deleteEquipmentAction,
    editEquipmentAction,
    getEquipmentAction,
    getEquipmentStatsAction,
    requestMaintenanceAction,
} from '@/actions/equipment.action';
import {
    Equipment,
    MaintenanceRequestData,
} from '@/features/EquipmentLog/EquipmentLog';
import { EquipmentStatsData } from '@/features/EquipmentLog/EquipmentStats';
import { EquipmentCategory } from '@/app/generated/prisma';
import { handleResponse } from '@/lib/handle-response';

export const useEquipment = () => {
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [stats, setStats] = useState<EquipmentStatsData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchEquipmentStats = async () => {
        const response = await getEquipmentStatsAction();
        const [data] = response;

        handleResponse(response, {
            onSuccess: () => {
                setStats(data);
            },
            onError: (errorMessage) => {
                console.error('Equipment stats fetch rejected:', errorMessage);
            },
        });
    };

    const fetchEquipment = async (filters: {
        search?: string;
        category?: EquipmentCategory;
        status?: string;
    }) => {
        const response = await getEquipmentAction(filters);
        const [data] = response;

        handleResponse(response, {
            onSuccess: () => {
                if (data !== null) {
                    setEquipment(data);
                    fetchEquipmentStats();
                }
            },
            onError: (errorMessage) => {
                console.error('Equipment fetch rejected:', errorMessage);
            },
        });

        setLoading(false);
    };

    const addNewEquipment = async (
        data: Omit<Equipment, 'id' | 'createdAt' | 'updatedAt'>,
    ) => {
        const response = await createEquipmentAction(
            data.name,
            data.category,
            data.serialNumber || '',
            data.location || '',
            data.status,
        );

        handleResponse(response, {
            successMessage: 'New Equipment added successfully!',
            onSuccess: async () => {
                await fetchEquipment({});
            },
            onError: (errorMessage) => {
                console.error('New Equipment creation rejected:', errorMessage);
            },
        });
    };

    const editEquipment = async (id: string, data: Equipment) => {
        const response = await editEquipmentAction(id, data);

        handleResponse(response, {
            successMessage: 'Equipment edited successfully!',
            onSuccess: async () => {
                fetchEquipment({});
            },
            onError: (errorMessage) => {
                console.error('Equipment edit rejected:', errorMessage);
            },
        });
    };

    const requestMaintenance = async (
        id: string,
        data: MaintenanceRequestData,
    ) => {
        const response = await requestMaintenanceAction(id, data);

        handleResponse(response, {
            successMessage: 'Maintenance Request sent successfully!',
            onSuccess: async () => {
                await fetchEquipment({});
            },
            onError: (errorMessage) => {
                console.error('Maintenance request rejected:', errorMessage);
            },
        });
    };

    const removeEquipment = async (id: string) => {
        const response = await deleteEquipmentAction(id);

        handleResponse(response, {
            successMessage: 'Equipment deleted successfully',
            onSuccess: async () => {
                await fetchEquipment({});
            },
            onError: (errorMessage) => {
                console.error('Equipment deletion rejected', errorMessage);
            },
        });
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchEquipmentStats();
    }, []);

    return {
        equipment,
        stats,
        loading,
        addNewEquipment,
        editEquipment,
        requestMaintenance,
        removeEquipment,
        fetchEquipment,
    };
};
