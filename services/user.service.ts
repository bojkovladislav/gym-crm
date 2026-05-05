import prisma from '@/lib/prisma';

export async function getUserRoleById(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
    });

    return user?.role || null;
}
