import {
    ActionIcon,
    Avatar,
    Badge,
    Group,
    ScrollArea,
    Table,
    Text,
    Tooltip,
} from '@mantine/core';
import { IconBarbell, IconMail } from '@tabler/icons-react';
import { Member } from '../Members/Members';
import { CreateAppointmentModal } from './CreateAppointmentModal';
import { MemberStatus } from '@/app/generated/prisma';

interface Props {
    trainerId: string;
    clients: Member[];
}

export default function MyClientsTable({ trainerId, clients }: Props) {
    const rows = clients.map((client) => {
        const nonActiveClient =
            client.status === MemberStatus.PENDING_ACTIVATION &&
            client.subscriptionStartDate === null;

        const isExpiring =
            client.subscriptionEndDate &&
            new Date(client.subscriptionEndDate).getTime() -
                new Date().getTime() <
                3 * 24 * 60 * 60 * 1000;

        return (
            <Table.Tr key={client.id}>
                <Table.Td>
                    <Group gap='sm'>
                        <Avatar size={30} radius='xl' color='blue'>
                            {client.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                        </Avatar>
                        <div>
                            <Text size='sm' fw={500}>
                                {client.name}
                            </Text>
                            <Text size='xs' c='dimmed'>
                                {client.email}
                            </Text>
                        </div>
                    </Group>
                </Table.Td>

                <Table.Td>
                    {nonActiveClient ? (
                        <Badge color='gray' variant='light'>
                            Subscription not activated
                        </Badge>
                    ) : (
                        <Badge
                            color={isExpiring ? 'orange' : 'green'}
                            variant='light'
                        >
                            {isExpiring ? 'Expiring Soon' : 'Active'}
                        </Badge>
                    )}
                </Table.Td>

                <Table.Td>
                    <Group gap={0} justify='flex-end'>
                        <Tooltip label='Log Training Session'>
                            <ActionIcon
                                variant='subtle'
                                color='blue'
                                onClick={() =>
                                    console.log('Log session for', client.id)
                                }
                            >
                                <IconBarbell size={16} />
                            </ActionIcon>
                        </Tooltip>

                        <Tooltip label='Send Reminder'>
                            <ActionIcon
                                variant='subtle'
                                color='gray'
                                onClick={() =>
                                    console.log('Send email to', client.email)
                                }
                            >
                                <IconMail size={16} />
                            </ActionIcon>
                        </Tooltip>

                        <CreateAppointmentModal
                            clientId={client.id}
                            clientName={client.name}
                            trainerId={trainerId}
                        />
                    </Group>
                </Table.Td>
            </Table.Tr>
        );
    });

    return (
        <ScrollArea>
            <Table verticalSpacing='sm' highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Client</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th />
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {rows.length > 0 ? (
                        rows
                    ) : (
                        <Table.Tr>
                            <Table.Td colSpan={4}>
                                <Text c='dimmed' ta='center' py='xl'>
                                    No clients assigned to you yet.
                                </Text>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    );
}
