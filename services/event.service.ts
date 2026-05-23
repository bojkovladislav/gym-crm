import { EventType, MembershipPlan, UserRole } from '@/app/generated/prisma';
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

        if (event.trainerId && event.type === 'TRAINER_SESSION') {
            const trainer = await tx.user.findUnique({
                where: { id: event.trainerId, role: UserRole.TRAINER },
                select: { sessionRate: true },
            });

            if (trainer && trainer.sessionRate && trainer.sessionRate > 0) {
                await tx.transaction.create({
                    data: {
                        amount: trainer.sessionRate,
                        type: 'EXPENSE',
                        category: 'COMMISSION',
                        description: `Commission: ${event.title}`,
                        staffId: event.trainerId,
                        eventId: event.id,
                    },
                });
            }
        }

        if (event.equipmentId) {
            await tx.equipment.update({
                where: { id: event.equipmentId },
                data: { status: 'OPERATIONAL' },
            });
        }

        if (event.amount <= 0) return null;

        return await tx.transaction.create({
            data: {
                amount: event.amount,
                type: isExpense ? 'EXPENSE' : 'INCOME',
                description: `${event.type}: ${event.title}`,
                category: event.type,
                eventId: event.id,
            },
        });
    });
}

export async function createAppointmentEvent(
    trainerId: string,
    memberId: string,
    memberName: string,
    data: AppointmentFormValues,
) {
    const trainer = await prisma.user.findUnique({
        where: { id: trainerId, role: UserRole.TRAINER },
    });
    if (!trainer) throw new Error('Trainer not found');

    const member = await prisma.member.findUnique({
        where: { id: memberId },
        select: { planId: true },
    });
    if (!member) throw new Error('Member not found');

    const plan = await prisma.plan.findUnique({
        where: { id: member.planId },
        select: { name: true },
    });
    if (!plan) throw new Error('Membership plan not found');

    let amount = 0;
    const REGULAR_TRAINING_PRICE = 30;

    if (plan.name === MembershipPlan.STANDARD) {
        amount = REGULAR_TRAINING_PRICE;
    } else if (plan.name === MembershipPlan.PREMIUM) {
        amount = REGULAR_TRAINING_PRICE * 0.5;
    }

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
                amount,
                start,
                end,
                trainerId,
            },
        });
    });
}
