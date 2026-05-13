import { getUserRoleAction } from '@/actions/user.action';
import { UserRole } from '@/app/generated/prisma/enums';
import { Schedule } from '@/features/Schedule';

export default async function SchedulePage() {
    const userRole = await getUserRoleAction();

    return <Schedule readOnly={userRole.data === UserRole.TRAINER} />;
}
