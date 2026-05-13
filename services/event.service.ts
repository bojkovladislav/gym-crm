'use server';

import { EventType, UserRole } from '@/app/generated/prisma/enums';
import { AppointmentFormValues } from '@/features/MyClients/CreateAppointmentModal';
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

export async function createAppointmentEvent(
    trainerId: string,
    memberName: string,
    data: AppointmentFormValues,
) {
    const trainer = await prisma.user.findUnique({
        where: { id: trainerId, role: UserRole.TRAINER },
    });

    return await prisma.$transaction(async (tx) => {
        const [hours, minutes] = data.startTime.split(':').map(Number);
        const start = new Date(data.date!);
        start.setHours(hours, minutes, 0, 0);

        const durationMinutes = parseInt(data.duration.split(' ')[0]);
        const end = new Date(start.getTime() + durationMinutes * 60000);

        return await tx.event.create({
            data: {
                title: `${data.title} ${trainer ? `(Trainer: ${trainer.name})` : ''}`,
                type: EventType.TRAINER_SESSION,
                description: data.notes,
                memberName,
                amount: 0, // for now. We will calculate amount based on the trainer percentage later on
                start,
                end,
            },
        });
    });
}
