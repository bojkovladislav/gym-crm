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
import { EquipmentCategory } from '@/app/generated/prisma/enums';

export const useEquipment = () => {
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [stats, setStats] = useState<EquipmentStatsData | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchEquipment = async (filters: {
        search?: string;
        category?: EquipmentCategory;
        status?: string;
    }) => {
        try {
            setLoading(true);
            const response = await getEquipmentAction(filters);

            setEquipment(response.data ?? []);
        } catch (error) {
            console.error('Failed to fetch equipment:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchEquipmentStats = async () => {
        try {
            const response = await getEquipmentStatsAction();

            if (response.success && response.data) {
                setStats(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch equipment:', error);
        }
    };

    const addNewEquipment = async (
        data: Omit<Equipment, 'id' | 'createdAt' | 'updatedAt'>,
    ) => {
        try {
            setLoading(true);
            const result = await createEquipmentAction(
                data.name,
                data.category,
                data.serialNumber || '',
                data.location || '',
                data.status,
            );

            if (!result.success) throw new Error(result.error);

            fetchEquipment({});

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const editEquipment = async (id: string, data: Equipment) => {
        try {
            setLoading(true);
            const result = await editEquipmentAction(id, data);

            if (!result.success) throw new Error(result.error);

            fetchEquipment({});

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Edit failed:', error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const requestMaintenance = async (
        id: string,
        data: MaintenanceRequestData,
    ) => {
        try {
            const result = await requestMaintenanceAction(id, data);

            if (!result.success) throw new Error(result.error);

            await fetchEquipment({});
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Maintenance request failed:', error.message);
            throw error;
        }
    };

    const removeEquipment = async (id: string) => {
        try {
            setLoading(true);
            await deleteEquipmentAction(id);

            fetchEquipment({});
        } catch (error) {
            console.error('Delete failed:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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
