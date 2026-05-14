import { PageHeader } from '@/components/PageHeader';
import { Box, Group, Stack } from '@mantine/core';
import BillingStats from './BillingStats';
import BillingDataTable from './BillingDataTable';
import SalesByCategoryChart from './SalesByCategoryChart';
import { TransactionType } from '@/app/generated/prisma';
import { getBillingDataAction } from '@/actions/transaction.action';

export interface Transaction {
    id: string;
    amount: number;
    type: TransactionType;
    category: string;
    description: string;
    createdAt: Date;
    member: { name: string } | null;
}

export default async function BillingSales() {
    const response = await getBillingDataAction();

    if (!response.data || !response.success || !response) {
        return (
            <div className='p-10 text-center'>
                <h2 className='text-red-500'>Unable to load billing data</h2>
                <p>
                    Please try refreshing the page or contact support if the
                    issue persists.
                </p>
            </div>
        );
    }

    const { stats, transactions } = response.data;

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
                    <BillingDataTable transactions={transactions} />
                </Box>

                <SalesByCategoryChart />
            </Group>
        </Stack>
    );
}
