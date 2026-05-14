import { getUserRoleAction } from '@/actions/user.action';
import { UserRole } from '@/app/generated/prisma/enums';
import { Dashboard } from '@/features/Dashboard';
import { getSessionOnServer } from '@/lib/auth-server';

export default async function DashboardPage() {
    const session = await getSessionOnServer();

    if (!session?.user?.id) {
        throw new Error('Unauthorized! The session has expired!');
    }

    const userRole = await getUserRoleAction();

    return (
        <Dashboard
            userRole={userRole.data as UserRole}
            userId={session.user.id}
        />
    );
}
