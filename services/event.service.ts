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

export async function completeEvent(eventId: string) {
    return await prisma.$transaction(async (tx) => {
        const event = await tx.event.findUnique({
            where: { id: eventId },
            include: { equipment: true },
        });

        if (!event) throw new Error('Event not found.');
        if (event.isCompleted) throw new Error('Event already completed.');

        await tx.event.update({
            where: { id: eventId },
            data: { isCompleted: true },
        });

        const isExpense = event.type === 'MAINTENANCE';

        const transaction = await tx.transaction.create({
            data: {
                amount: event.amount,
                type: isExpense ? 'EXPENSE' : 'INCOME',
                description: `${event.type}: ${event.title}`,
                category: event.type,
                eventId: event.id,
            },
        });

        if (event.equipmentId) {
            await tx.equipment.update({
                where: { id: event.equipmentId },
                data: { status: 'OPERATIONAL' },
            });
        }

        return transaction;
    });
}
