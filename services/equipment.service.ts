'use server';

import { EquipmentStatus } from '@/app/generated/prisma/enums';
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
    category?: string;
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
    category: string,
    serialNumber?: string,
    location?: string,
) {
    const newEquipment = await prisma.equipment.create({
        data: {
            name: name,
            category: category,
            serialNumber: serialNumber || null,
            location: location || null,
            status: 'OPERATIONAL' as EquipmentStatus,
        },
    });

    return newEquipment;
}

export async function editEquipment(
    id: string,

    name: string,
    category: string,
    serialNumber: string,
    location: string,
) {
    const updatedEquipment = await prisma.equipment.update({
        where: {
            id,
        },
        data: {
            name,
            category,
            serialNumber,
            location,
        },
    });

    return updatedEquipment;
}

export async function deleteEquipment(id: string) {
    return await prisma.equipment.delete({ where: { id } });
}
