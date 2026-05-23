import { getUserRoleAction } from '@/actions/user.action';
import { UserRole } from '@/app/generated/prisma';
import { Unauthorized } from '@/components/Unathorized';
import { Schedule } from '@/features/Schedule';

export default async function SchedulePage() {
    const [role, error] = await getUserRoleAction();

    if (error || !role) {
        return <Unauthorized />;
    }

    return <Schedule readOnly={role === UserRole.TRAINER} />;
}
