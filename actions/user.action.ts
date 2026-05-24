'use server';

import { UserRole } from '@/app/generated/prisma';
import { createSafeAction } from '@/helpers/createSafeAction';
import { getSessionOnServer } from '@/lib/auth-server';
import {
    deleteUser,
    editUser,
    getUserRoleById,
    getUsers,
} from '@/services/user.service';

export const getUsersAction = async () =>
    await createSafeAction(getUsers, 'Could not fetch users from database.');

export const getUserRoleAction = async () =>
    await createSafeAction(async () => {
        const session = await getSessionOnServer();

        if (!session?.user?.id) {
            throw new Error('Unauthorized! The session has expired!');
        }

        return await getUserRoleById(session.user.id);
    }, 'Could not retrieve User Role.');

export const updateUser = async (
    userId: string,
    updatedData: { name: string; email: string; role: UserRole },
) =>
    await createSafeAction(
        () => editUser(userId, updatedData),
        'Could not update user in the database.',
    );

export const removeUser = async (userId: string) =>
    await createSafeAction(
        () => deleteUser(userId),
        'Could not delete user from the database.',
    );
