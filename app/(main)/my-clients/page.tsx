import { getTrainerMembersAction } from '@/actions/member.action';
import { MyClients } from '@/features/MyClients';
import { getSessionOnServer } from '@/lib/auth-server';
import { handleResponse } from '@/lib/handle-response';

export default async function MyClientsPage() {
    const session = await getSessionOnServer();

    if (!session?.user?.id) {
        throw new Error('Unauthorized! The session has expired!');
    }

    const response = await getTrainerMembersAction(session.user.id);
    const [data] = response;

    handleResponse(response);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <MyClients clients={data as any} trainerId={session.user.id} />;
}
