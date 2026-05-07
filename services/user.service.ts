'use server';

import { Role } from '@/config/nav-tabs';
import prisma from '@/lib/prisma';

export async function getUserRoleById(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
    });

    return user?.role || null;
}

export async function editUser(
    userId: string,
    updatedData: { name: string; email: string; role: Role },
) {
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { ...updatedData },
    });

    console.log('User updated successfully!', updatedUser);
}

export async function deleteUser(userId: string) {
    return await prisma.user.delete({ where: { id: userId } });
}
