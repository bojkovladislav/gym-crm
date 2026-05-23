import { getUserRoleAction } from '@/actions/user.action';
import { Unauthorized } from '@/components/Unathorized';
import { Dashboard } from '@/features/Dashboard';
import { getSessionOnServer } from '@/lib/auth-server';

export default async function DashboardPage() {
    const session = await getSessionOnServer();

    if (!session?.user?.id) {
        throw new Error('Unauthorized! The session has expired!');
    }

    const [role, error] = await getUserRoleAction();

    if (error || !role) {
        return <Unauthorized />;
    }

    return <Dashboard userRole={role} userId={session.user.id} />;
}
