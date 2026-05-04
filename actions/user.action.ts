import { getSessionOnServer } from '@/lib/auth-server';
import { getUserRoleById } from '@/services/user.service';

export async function getUserRoleAction() {
    const session = await getSessionOnServer();

    if (!session?.user?.id) {
        throw new Error('Unauthorized! The session has expired!');
    }

    return await getUserRoleById(session.user.id);
}
