import prisma from '@/lib/prisma';

export async function getPlans() {
    return await prisma.plan.findMany();
}
