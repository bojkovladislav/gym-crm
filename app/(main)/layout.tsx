import { getUserRoleAction } from '@/actions/user.action';
import { LayoutShell } from '@/components/LayoutShell';
import { UserRole } from '../generated/prisma';

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const userRole = await getUserRoleAction();

    return (
        <LayoutShell userRole={userRole.data as UserRole}>
            {children}
        </LayoutShell>
    );
}
