import prisma from '@/lib/prisma';

export async function getTransactionStats() {
    const now = new Date();

    const transactions = await prisma.transaction.findMany();

    const pendingRenewalsCount = await prisma.member.count({
        where: {
            autoRenew: false,
            subscriptionEndDate: { lt: now },
            status: {
                in: ['ACTIVE', 'INACTIVE'],
            },
        },
    });

    const totalRevenue = transactions
        .filter((transaction) => transaction.type === 'INCOME')
        .reduce((sum, t) => sum + t.amount, 0);

    const operationalCosts = transactions
        .filter((transaction) => transaction.type === 'EXPENSE')
        .reduce((sum, t) => sum + t.amount, 0);

    return {
        totalRevenue,
        operationalCosts,
        netProfit: totalRevenue - operationalCosts,
        pendingRenewals: pendingRenewalsCount,
        transactionCount: transactions.length,
    };
}

export async function getAllTransactions() {
    return prisma.transaction.findMany({
        include: { member: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
    });
}

export async function getTransactionChartData() {
    const groups = await prisma.transaction.groupBy({
        by: ['category'],
        _sum: {
            amount: true,
        },
        where: { type: 'INCOME' },
    });

    const colorMap: Record<string, string> = {
        Subscription: '#228be6',
        TRAINER_SESSION: '#40c057',
        Maintenance: '#fa5252',
        Other: '#fab005',
    };

    return groups.map((group) => ({
        name: group.category,
        value: group._sum.amount || 0,
        color: colorMap[group.category] || colorMap['Other'],
    }));
}
