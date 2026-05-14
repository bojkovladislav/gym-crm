import { getUserRoleAction } from '@/actions/user.action';
import { UserRole } from '@/app/generated/prisma';
import { Staff } from '@/features/Staff';

export default async function StaffPage() {
    const userRole = await getUserRoleAction();

    return <Staff userRole={userRole.data as UserRole} />;
}
