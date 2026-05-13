import { getUserRoleAction } from '@/actions/user.action';
import { UserRole } from '@/app/generated/prisma/enums';
import { EquipmentLog } from '@/features/EquipmentLog';

export default async function EquipmentPage() {
    const userRole = await getUserRoleAction();

    return <EquipmentLog readOnly={userRole.data === UserRole.TRAINER} />;
}
