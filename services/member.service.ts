'use server';

import { UserRole } from '@/app/generated/prisma/enums';
import prisma from '@/lib/prisma';

export async function editMember(
    memberId: string,
    updatedData: { name?: string; email?: string; dob?: Date; planId?: string },
) {
    const updatedMember = await prisma.member.update({
        where: { id: memberId },
        data: { ...updatedData },
    });

    console.log('Member updated successfully!', updatedMember);
    return updatedMember;
}

export async function deleteMember(memberId: string) {
    return await prisma.member.delete({ where: { id: memberId } });
}

export async function memberCheckIn(memberId: string) {
    const member = await prisma.member.findUnique({ where: { id: memberId } });

    if (!member) throw new Error('Member not found');

    const now = new Date();

    if (member.subscriptionEndDate && member.subscriptionEndDate < now) {
        if (member.autoRenew) {
            const newEndDate = new Date();
            newEndDate.setMonth(newEndDate.getMonth() + 1);

            await prisma.$transaction(async (tx) => {
                await tx.member.update({
                    where: { id: memberId },
                    data: {
                        subscriptionEndDate: newEndDate,
                        status: 'ACTIVE',
                        visits: { increment: 1 },
                    },
                });

                const plan = await tx.plan.findUnique({
                    where: { id: member.planId },
                    select: { price: true, name: true },
                });

                if (!plan) throw new Error('Plan not found');

                await tx.transaction.create({
                    data: {
                        amount: plan?.price,
                        type: 'INCOME',
                        category: 'Subscription',
                        description: `Auto-Renewal: ${plan.name}`,
                        memberId,
                    },
                });
            });

            return { message: 'Subscription auto-renewed! Welcome back.' };
        }

        await prisma.member.update({
            where: { id: memberId },
            data: { status: 'INACTIVE' },
        });

        return {
            message:
                'Sorry, but your Subscription has expired. PLease come to the registration desk to continue.',
        };
    }

    if (member.status === 'PENDING_ACTIVATION') {
        const startDate = new Date();
        const endDate = new Date();

        endDate.setMonth(endDate.getMonth() + 1);

        await prisma.member.update({
            where: { id: memberId },
            data: {
                visits: { increment: 1 },
                status: 'ACTIVE',
                subscriptionStartDate: startDate,
                subscriptionEndDate: endDate,
            },
        });

        return {
            message: 'You have successfully activated your subscription.',
        };
    }

    await prisma.member.update({
        where: { id: memberId },
        data: { visits: { increment: 1 } },
    });

    return { message: 'You have been successfully authenticated. Welcome In' };
}

export async function getTrainerMembers(trainerId: string) {
    return await prisma.member.findMany({
        where: { assignedTrainerId: trainerId },
    });
}

export async function getActiveTrainers() {
    const trainers = await prisma.user.findMany({
        where: { role: UserRole.TRAINER },
        select: { id: true, name: true },
    });

    return trainers.map((trainer) => ({
        value: trainer.id,
        label: trainer.name,
    }));
}
