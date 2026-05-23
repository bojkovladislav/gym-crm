import { getUserRoleAction } from '@/actions/user.action';
import { UserRole } from '@/app/generated/prisma';
import { Unauthorized } from '@/components/Unathorized';
import { EquipmentLog } from '@/features/EquipmentLog';

export default async function EquipmentPage() {
    const [role, error] = await getUserRoleAction();

    if (error || !role) {
        return <Unauthorized />;
    }

    return <EquipmentLog readOnly={role === UserRole.TRAINER} />;
}
