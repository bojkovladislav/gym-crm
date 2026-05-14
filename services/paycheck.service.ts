import { PaycheckStatus } from '@/app/generated/prisma';
import prisma from '@/lib/prisma';

export async function getUserPaycheckStats(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { baseSalary: true },
    });

    if (!user) throw new Error('User not found');

    const totalPaid = await prisma.paycheck.aggregate({
        where: {
            userId,
            status: PaycheckStatus.PAID,
        },
        _sum: { amount: true },
    });

    return {
        baseSalary: user.baseSalary || 0,
        totalEarnings: totalPaid._sum.amount || 0,
    };
}
