'use server';

import { UserRole } from '@/app/generated/prisma/enums';
import { getSessionOnServer } from '@/lib/auth-server';
import { deleteUser, editUser, getUserRoleById } from '@/services/user.service';

export async function getUserRoleAction() {
    const session = await getSessionOnServer();

    if (!session?.user?.id) {
        throw new Error('Unauthorized! The session has expired!');
    }

    try {
        const userRole = await getUserRoleById(session.user.id);

        return { success: true, data: userRole };
    } catch (error) {
        return {
            success: false,
            error: 'Could not retrieve User Role.',
        };
    }
}

export async function updateUser(
    userId: string,
    updatedData: { name: string; email: string; role: UserRole },
) {
    try {
        const user = await editUser(userId, updatedData);

        return { success: true, data: user };
    } catch (error) {
        return {
            success: false,
            error: 'Could not update user in the database.',
        };
    }
}

export async function removeUser(userId: string) {
    try {
        const deletedUser = await deleteUser(userId);

        return { success: true, data: deletedUser };
    } catch (error) {
        return {
            success: false,
            error: 'Could not delete user.',
        };
    }
}
