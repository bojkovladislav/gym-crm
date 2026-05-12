'use client';

import {
    Table,
    Badge,
    Text,
    Group,
    Paper,
    ActionIcon,
    ScrollArea,
} from '@mantine/core';
import {
    IconReceipt,
    IconExternalLink,
    IconDotsVertical,
} from '@tabler/icons-react';

const mockTransactions = [
    {
        id: '1',
        amount: 50.0,
        type: 'INCOME',
        category: 'Subscription',
        description: 'Monthly Plan - Mike Ross',
        createdAt: new Date('2026-05-10T10:00:00'),
        member: { name: 'Mike Ross' },
    },
    {
        id: '2',
        amount: 450.0,
        type: 'EXPENSE',
        category: 'Utilities',
        description: 'Electricity & Water Bill (May)',
        createdAt: new Date('2026-05-08T14:30:00'),
        member: null,
    },
    {
        id: '3',
        amount: 75.0,
        type: 'INCOME',
        category: 'TRAINER_SESSION',
        description: 'Bodybuilding 101 with Trainer Mike',
        createdAt: new Date('2026-05-07T09:15:00'),
        member: { name: 'Rachel Zane' },
    },
    {
        id: '4',
        amount: 120.0,
        type: 'EXPENSE',
        category: 'MAINTENANCE',
        description: 'Treadmill-1 Belt Replacement',
        createdAt: new Date('2026-05-05T16:45:00'),
        member: null,
    },
    {
        id: '5',
        amount: 25.0,
        type: 'INCOME',
        category: 'Subscription',
        description: 'Weekly Pass',
        createdAt: new Date('2026-05-01T11:00:00'),
        member: { name: 'Harvey Specter' },
    },
];

export default function BillingDataTable() {
    const rows = mockTransactions.map((tx) => (
        <Table.Tr key={tx.id}>
            <Table.Td>
                <Text size='sm' fw={500}>
                    {tx.createdAt.toLocaleDateString()}
                </Text>
                <Text size='xs' c='dimmed'>
                    {tx.createdAt.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </Text>
            </Table.Td>

            <Table.Td>
                <Group gap='sm'>
                    <IconReceipt size={16} stroke={1.5} color='gray' />
                    <div>
                        <Text size='sm' fw={600}>
                            {tx.member?.name || tx.category}
                        </Text>
                        <Text size='xs' c='dimmed'>
                            {tx.description}
                        </Text>
                    </div>
                </Group>
            </Table.Td>

            <Table.Td>
                <Badge
                    variant='light'
                    color={tx.type === 'INCOME' ? 'green' : 'red'}
                    size='sm'
                >
                    {tx.type}
                </Badge>
            </Table.Td>

            <Table.Td>
                <Text
                    size='sm'
                    fw={700}
                    c={tx.type === 'INCOME' ? 'green.7' : 'red.8'}
                >
                    {tx.type === 'INCOME' ? '+' : '-'}${tx.amount.toFixed(2)}
                </Text>
            </Table.Td>

            <Table.Td>
                <Group gap={0} justify='flex-end'>
                    <ActionIcon variant='subtle' color='gray'>
                        <IconExternalLink size={16} />
                    </ActionIcon>
                    <ActionIcon variant='subtle' color='gray'>
                        <IconDotsVertical size={16} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Paper withBorder radius='md' p='md' h='100%'>
            <ScrollArea onScrollPositionChange={({ y }) => {}}>
                <Table verticalSpacing='sm' highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Date</Table.Th>
                            <Table.Th>Details</Table.Th>
                            <Table.Th>Type</Table.Th>
                            <Table.Th>Amount</Table.Th>
                            <Table.Th />
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
        </Paper>
    );
}
