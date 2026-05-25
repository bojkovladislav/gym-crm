'use client';

import { PageHeader } from '@/components/PageHeader';
import { Box, Group, Stack } from '@mantine/core';
import BillingStats from './BillingStats';
import BillingDataTable from './BillingDataTable';
import SalesByCategoryChart from './SalesByCategoryChart';
import { TransactionType } from '@/app/generated/prisma';
import { getBillingDataAction } from '@/actions/transaction.action';
import { handleResponse } from '@/lib/handle-response';
import { useEffect, useState } from 'react';

export interface Transaction {
    id: string;
    amount: number;
    type: TransactionType;
    category: string;
    description: string;
    createdAt: Date;
    member: { name: string } | null;
}

export default function BillingSales() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [stats, setStats] = useState<Record<string, number> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getBillingData() {
            const response = await getBillingDataAction();
            const [data] = response;

            handleResponse(response, {
                onSuccess: () => {
                    if (data !== null) {
                        setTransactions(data.transactions);
                        setStats(data.stats);
                    }
                },
                onError: (errorMessage) => {
                    console.error(
                        'Fetch of billing information rejected:',
                        errorMessage,
                    );
                },
            });

            setLoading(false);
        }

        getBillingData();
    }, []);

    return (
        <Stack>
            <PageHeader
                entityInPlural='Billing & Sales'
                subTitle='Track gym transactions, bills and sales.'
                formTitle='Log New Gym Equipment'
            />

            <BillingStats stats={stats} />

            <Group align='stretch'>
                <Box style={{ flex: 1 }}>
                    <BillingDataTable
                        transactions={transactions}
                        loading={loading}
                    />
                </Box>

                <SalesByCategoryChart />
            </Group>
        </Stack>
    );
}
