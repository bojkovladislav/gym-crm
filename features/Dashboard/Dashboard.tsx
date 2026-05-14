import { UserRole } from '@/app/generated/prisma';
import { Box } from '@mantine/core';
import WorkerDashboard from './WorkerDashboard';
import TrainerDashboard from './TrainerDashboard';
import { OwnerDashboard } from './OwnerDashboard';
import { AdminDashboard } from './AdminDashboard';

interface Props {
    userRole: UserRole;
    userId: string;
}

export default function Dashboard({ userRole, userId }: Props) {
    return (
        <Box>
            {userRole === UserRole.ADMIN && <AdminDashboard />}
            {userRole === UserRole.OWNER && <OwnerDashboard />}
            {userRole === UserRole.WORKER && <WorkerDashboard />}
            {userRole === UserRole.TRAINER && (
                <TrainerDashboard userId={userId} />
            )}
        </Box>
    );
}
