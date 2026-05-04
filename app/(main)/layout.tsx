import { getUserRoleAction } from '@/actions/user.action';
import { LayoutShell } from '@/components/LayoutShell';
import { Role } from '@/config/nav-tabs';

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const userRole = await getUserRoleAction();

    return <LayoutShell userRole={userRole as Role}>{children}</LayoutShell>;
}
