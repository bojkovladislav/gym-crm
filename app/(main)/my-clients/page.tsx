import { getTrainerMembersAction } from '@/actions/member.action';
import { MyClients } from '@/features/MyClients';
import { getSessionOnServer } from '@/lib/auth-server';

export default async function MyClientsPage() {
    const session = await getSessionOnServer();

    if (!session?.user?.id) {
        throw new Error('Unauthorized! The session has expired!');
    }

    const { success, data } = await getTrainerMembersAction(session.user.id);

    if (!success || !data) {
        throw new Error('Failed to load clients');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <MyClients clients={data as any} trainerId={session.user.id} />;
}
