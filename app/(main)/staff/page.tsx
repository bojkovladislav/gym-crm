import { getUserRoleAction } from '@/actions/user.action';
import { Role } from '@/config/nav-tabs';
import { Staff } from '@/features/Staff';

export default async function StaffPage() {
    const userRole = await getUserRoleAction();

    return <Staff userRole={userRole.data as Role} />;
}
