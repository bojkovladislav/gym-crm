import prisma from '@/lib/prisma';

export async function getVisits(memberId: string) {
    return await prisma.visit.findMany({
        where: { memberId },
        orderBy: { visitDate: 'desc' },
    });
}
