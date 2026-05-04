import prisma from '@/lib/prisma';

export async function getUserRoleById(userId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true },
        });

        return user?.role || null;
    } catch (error) {
        console.error('Failed to get user role', error);
        throw new Error('Could not fetch user role');
    }
}
