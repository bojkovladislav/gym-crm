import { getUserRoleAction } from '@/actions/user.action';
import { Unauthorized } from '@/components/Unathorized';
import { Staff } from '@/features/Staff';

export default async function StaffPage() {
    const [role, error] = await getUserRoleAction();

    if (error || !role) {
        return <Unauthorized />;
    }

    return <Staff userRole={role} />;
}
