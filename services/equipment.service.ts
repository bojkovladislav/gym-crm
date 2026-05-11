'use server';

import {
    EquipmentCategory,
    EquipmentStatus,
    EventType,
} from '@/app/generated/prisma/enums';
import {
    Equipment,
    MaintenanceRequestData,
} from '@/features/EquipmentLog/EquipmentLog';
import { mergeDateAndTime } from '@/helpers/mergeTimeAndDate';
import prisma from '@/lib/prisma';

export async function getEquipmentStats() {
    const [counts, newAdditions] = await Promise.all([
        prisma.equipment.groupBy({
            by: ['status'],
            _count: { _all: true },
        }),
        prisma.equipment.count({
            where: {
                createdAt: {
                    gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                },
            },
        }),
    ]);

    const statsMap = counts.reduce(
        (acc, curr) => {
            acc[curr.status] = curr._count._all;

            return acc;
        },
        {} as Record<EquipmentStatus, number>,
    );

    return {
        total: Object.values(statsMap).reduce((a, b) => a + b, 0),
        operational: statsMap.OPERATIONAL || 0,
        maintenance: statsMap.MAINTENANCE_REQUIRED || 0,
        outOfOrder: statsMap.OUT_OF_ORDER || 0,
        newAdditions,
    };
}

export async function getFilteredEquipment(filters: {
    search?: string;
    category?: EquipmentCategory;
    status?: string;
}) {
    return await prisma.equipment.findMany({
        where: {
            AND: [
                filters.search
                    ? {
                          OR: [
                              {
                                  name: {
                                      contains: filters.search,
                                      mode: 'insensitive',
                                  },
                              },
                              {
                                  serialNumber: {
                                      contains: filters.search,
                                      mode: 'insensitive',
                                  },
                              },
                          ],
                      }
                    : {},

                filters.category ? { category: filters.category } : {},
                filters.status
                    ? { status: filters.status as EquipmentStatus }
                    : {},
            ],
        },
        orderBy: { updatedAt: 'desc' },
        include: { _count: { select: { maintenanceLogs: true } } },
    });
}

export async function createEquipment(
    name: string,
    category: EquipmentCategory,
    serialNumber?: string,
    location?: string,
    status?: EquipmentStatus,
) {
    const newEquipment = await prisma.equipment.create({
        data: {
            name,
            category,
            serialNumber: serialNumber || null,
            location: location || null,
            status: status || ('OPERATIONAL' as EquipmentStatus),
        },
    });

    return newEquipment;
}

export async function editEquipment(id: string, data: Equipment) {
    const updatedEquipment = await prisma.equipment.update({
        where: {
            id,
        },
        data: {
            ...data,
        },
    });

    return updatedEquipment;
}

export async function requestMaintenance(
    id: string,
    data: MaintenanceRequestData,
) {
    const { requestTitle, date, cost, startTime, finishTime } = data;

    const numericAmount = parseFloat(cost as unknown as string) || 0;

    const baseDate = new Date(date);

    const start = mergeDateAndTime(baseDate, startTime);
    const end = mergeDateAndTime(baseDate, finishTime);

    return await prisma.$transaction(async (tx) => {
        const event = await tx.event.create({
            data: {
                title: requestTitle || 'Maintenance',
                type: EventType.MAINTENANCE,
                start,
                end,
                equipmentId: id,
                amount: numericAmount,
                isCompleted: false,
            },
        });

        const updatedEquipment = await prisma.equipment.update({
            where: { id },
            data: {
                status: 'UNDER_MAINTENANCE',
            },
        });

        return { event, updatedEquipment };
    });
}

export async function deleteEquipment(id: string) {
    return await prisma.equipment.delete({ where: { id } });
}
