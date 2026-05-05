import { getSessionOnServer } from '@/lib/auth-server';
import { getUserRoleById } from '@/services/user.service';

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
