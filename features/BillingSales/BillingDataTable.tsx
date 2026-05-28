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
    Menu,
} from '@mantine/core';
import {
    IconReceipt,
    IconExternalLink,
    IconDotsVertical,
    IconDownload,
} from '@tabler/icons-react';
import { Transaction } from './BillingSales';
import { downloadInvoicePDF } from '@/lib/download-invoice';
import { InvoiceComponent } from '@/components/InvoiceComponent/InvoiceComponent';
import { useRef } from 'react';
import { formatDateString } from '@/helpers/formatters';

interface Props {
    transactions: Transaction[];
    loading: boolean;
}

export default function BillingDataTable({ transactions, loading }: Props) {
    const invoiceRef = useRef<HTMLDivElement>(null);

    async function handleDownload(transactionDate: string) {
        await downloadInvoicePDF(
            'invoice-container',
            `invoice_${transactionDate}`,
        );
    }

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
                    <Menu shadow='md' width={200}>
                        <Menu.Target>
                            <ActionIcon variant='subtle' color='gray'>
                                <IconDotsVertical size={16} />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>Transaction actions</Menu.Label>

                            <Menu.Item
                                leftSection={<IconDownload size={14} />}
                                onClick={() =>
                                    handleDownload(
                                        formatDateString(tx.createdAt),
                                    )
                                }
                            >
                                Download Invoice PDF
                            </Menu.Item>

                            <div
                                style={{
                                    position: 'absolute',
                                    left: '-9999px',
                                    top: '0',
                                }}
                            >
                                <InvoiceComponent
                                    ref={invoiceRef}
                                    transaction={tx}
                                />
                            </div>
                        </Menu.Dropdown>
                    </Menu>
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
