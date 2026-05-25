'use client';

import {
    Table,
    Badge,
    Text,
    Group,
    Paper,
    ActionIcon,
    ScrollArea,
    Loader,
} from '@mantine/core';
import {
    IconReceipt,
    IconExternalLink,
    IconDotsVertical,
} from '@tabler/icons-react';
import { Transaction } from './BillingSales';

interface Props {
    transactions: Transaction[];
    loading: boolean;
}

export default function BillingDataTable({ transactions, loading }: Props) {
    const rows = transactions.map((tx) => (
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
                    <Table.Tbody>
                        {loading ? (
                            <Table.Tr>
                                <Table.Td
                                    colSpan={7}
                                    style={{ textAlign: 'center' }}
                                >
                                    <Loader />
                                </Table.Td>
                            </Table.Tr>
                        ) : (
                            rows
                        )}
                    </Table.Tbody>
                </Table>
            </ScrollArea>
        </Paper>
    );
}
