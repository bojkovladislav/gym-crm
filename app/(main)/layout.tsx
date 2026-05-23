import { getUserRoleAction } from '@/actions/user.action';
import { LayoutShell } from '@/components/LayoutShell';
import { Unauthorized } from '@/components/Unathorized';

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [role, error] = await getUserRoleAction();

    if (error || !role) {
        return <Unauthorized />;
    }

    return <LayoutShell userRole={role}>{children}</LayoutShell>;
}
