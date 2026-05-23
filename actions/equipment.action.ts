'use server';

import { EquipmentCategory, EquipmentStatus } from '@/app/generated/prisma';
import {
    Equipment,
    MaintenanceRequestData,
} from '@/features/EquipmentLog/EquipmentLog';
import { createSafeAction } from '@/helpers/createSafeAction';
import {
    getEquipmentStats,
    getFilteredEquipment,
    createEquipment,
    editEquipment,
    deleteEquipment,
    requestMaintenance,
} from '@/services/equipment.service';

export const getEquipmentStatsAction = async () =>
    await createSafeAction(
        getEquipmentStats,
        'Could not load equipment stats from database.',
    );

export const getEquipmentAction = async (filters: {
    search?: string;
    category?: EquipmentCategory;
    status?: string;
}) =>
    await createSafeAction(
        () => getFilteredEquipment(filters),
        'Could not fetch equipment from database.',
    );

export const createEquipmentAction = async (
    name: string,
    category: EquipmentCategory,
    serialNumber?: string,
    location?: string,
    status?: EquipmentStatus,
) =>
    await createSafeAction(
        () => createEquipment(name, category, serialNumber, location, status),
        'Could not add new equipment to the database.',
    );

export const editEquipmentAction = async (id: string, data: Equipment) =>
    await createSafeAction(
        () => editEquipment(id, data),
        'Could not edit equipment.',
    );

export const requestMaintenanceAction = async (
    id: string,
    data: MaintenanceRequestData,
) =>
    await createSafeAction(
        () => requestMaintenance(id, data),
        'Could not request maintenance.',
    );

export const deleteEquipmentAction = async (id: string) =>
    await createSafeAction(
        () => deleteEquipment(id),
        'Could not delete equipment from database.',
    );
