import {
    EquipmentCategory,
    EquipmentStatus,
} from '@/app/generated/prisma/enums';
import {
    Equipment,
    MaintenanceRequestData,
} from '@/features/EquipmentLog/EquipmentLog';
import {
    getEquipmentStats,
    getFilteredEquipment,
    createEquipment,
    editEquipment,
    deleteEquipment,
    requestMaintenance,
} from '@/services/equipment.service';

export async function getEquipmentStatsAction() {
    try {
        const data = await getEquipmentStats();

        return { success: true, data };
    } catch (error) {
        return { success: false, error: 'Failed to load equipment data.' };
    }
}

export async function getEquipmentAction(filters: {
    search?: string;
    category?: EquipmentCategory;
    status?: string;
}) {
    try {
        const data = await getFilteredEquipment(filters);

        return { success: true, data };
    } catch (error) {
        return { success: false, error: 'Failed to get Equipment.' };
    }
}

export async function createEquipmentAction(
    name: string,
    category: EquipmentCategory,
    serialNumber?: string,
    location?: string,
    status?: EquipmentStatus,
) {
    try {
        const result = await createEquipment(
            name,
            category,
            serialNumber,
            location,
            status,
        );

        return {
            success: true,
            data: result,
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to create equipment. Please try again.',
        };
    }
}

export async function editEquipmentAction(id: string, data: Equipment) {
    try {
        const updatedEquipment = await editEquipment(id, data);

        return { success: true, data: updatedEquipment };
    } catch (error) {
        return { success: false, error: 'Failed to edit equipment.' };
    }
}

export async function requestMaintenanceAction(
    id: string,
    data: MaintenanceRequestData,
) {
    try {
        const result = await requestMaintenance(id, data);

        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: 'Failed to request maintenance.' };
    }
}

export async function deleteEquipmentAction(id: string) {
    try {
        const deletedEquipment = await deleteEquipment(id);

        return { success: true, data: deletedEquipment };
    } catch (error) {
        return { success: false, error: 'Failed to delete Equipment.' };
    }
}
