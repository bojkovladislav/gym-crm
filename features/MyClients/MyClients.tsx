'use client';

import { PageHeader } from '@/components/PageHeader';
import { Stack } from '@mantine/core';
import MyClientsTable from './MyClientsTable';
import { Member } from '../Members/Members';

interface Props {
    trainerId: string;
    clients: Member[];
}

export default function MyClients({ trainerId, clients }: Props) {
    return (
        <Stack>
            <PageHeader
                entityInPlural='My Clients'
                subTitle='View your clients, add personal notes, and create new training sessions'
            />

            <MyClientsTable trainerId={trainerId} clients={clients} />
        </Stack>
    );
}
