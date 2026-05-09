'use server';

import prisma from '@/lib/prisma';

export async function getEvents() {
    const events = await prisma.event.findMany({
        include: {
            equipment: {
                select: {
                    name: true,
                    category: true,
                },
            },
        },
        orderBy: {
            start: 'desc',
        },
    });

    return events;
}
