import prisma from '@/lib/prisma';

export async function getOwnerDashboardStats() {
    const sourcesRaw = await prisma.transaction.groupBy({
        by: ['category'],
        where: { type: 'INCOME' },
        _sum: { amount: true },
    });

    const revenueSources = sourcesRaw.map((item) => ({
        name: item.category,
        value: item._sum.amount || 0,
    }));

    const trendRaw = await prisma.$queryRaw`
        SELECT 
            TO_CHAR(date_trunc('month', "createdAt"), 'Mon') AS month,
            SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END) as income,
            SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) as expense
        FROM "Transaction"
        WHERE "createdAt" > NOW() - INTERVAL '6 months'
        GROUP BY date_trunc('month', "createdAt")
        ORDER BY date_trunc('month', "createdAt") ASC
    `;

    const revenue = await prisma.transaction.aggregate({
        where: { type: 'INCOME' },
        _sum: { amount: true },
    });

    const expenses = await prisma.transaction.aggregate({
        where: { type: 'EXPENSE' },
        _sum: { amount: true },
    });

    const totalMembers = await prisma.member.count();

    return {
        revenue: revenue._sum.amount || 0,
        expenses: expenses._sum.amount || 0,
        profit: (revenue._sum.amount || 0) - (expenses._sum.amount || 0),
        totalMembers,
        revenueSources,
        monthlyTrade: trendRaw,
    };
}

export async function getAdminDashboardStats() {
    const equipmentStats = await prisma.equipment.groupBy({
        by: ['status'],
        _count: { _all: true },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const appointmentsToday = await prisma.event.count({
        where: {
            type: 'TRAINER_SESSION',
            start: { gte: today, lt: tomorrow },
        },
    });

    const pendingMaintenance = await prisma.event.count({
        where: {
            type: 'MAINTENANCE',
            isCompleted: false,
        },
    });

    return {
        equipmentStats,
        appointmentsToday,
        pendingMaintenance,
    };
}

export async function getTrainerDashboardStats(trainerId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const trainerProfile = await prisma.user.findUnique({
        where: { id: trainerId },
        select: { sessionRate: true, baseSalary: true },
    });

    const upcomingSessions = await prisma.event.findMany({
        where: {
            trainerId,
            type: 'TRAINER_SESSION',
            start: { gte: new Date() },
            isCompleted: false,
        },
        take: 5,
        orderBy: { start: 'asc' },
        select: {
            id: true,
            start: true,
            memberName: true,
        },
    });

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const completedSessionsCount = await prisma.event.count({
        where: {
            trainerId: trainerId,
            type: 'TRAINER_SESSION',
            isCompleted: true,
            start: { gte: startOfMonth },
        },
    });

    const pendingCommission =
        completedSessionsCount * (trainerProfile?.sessionRate || 0);

    return {
        baseSalary: trainerProfile?.baseSalary || 0,
        sessionRate: trainerProfile?.sessionRate || 0,
        upcomingSessions,
        completedSessionsCount,
        pendingCommission,
    };
}
