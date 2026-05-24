'use server';

import { UserRole } from '@/app/generated/prisma';
import { getSessionOnServer } from '@/lib/auth-server';
import prisma from '@/lib/prisma';

export async function getUsers() {
    const session = await getSessionOnServer();

    if (!session?.user.id) {
        throw new Error('Unauthorized! Failed to obtain user id.');
    }

    return await prisma.user.findMany({
        where: { id: { not: session.user.id } },
    });
}

export async function getUserRoleById(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
    });

    return user?.role || null;
}

export async function editUser(
    userId: string,
    updatedData: { name: string; email: string; role: UserRole },
) {
    return await prisma.user.update({
        where: { id: userId },
        data: { ...updatedData },
    });
}

export async function deleteUser(userId: string) {
    return await prisma.user.delete({ where: { id: userId } });
}
