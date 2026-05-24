import { PageHeader } from '@/components/PageHeader';
import { Box, Group, Stack } from '@mantine/core';
import BillingStats from './BillingStats';
import BillingDataTable from './BillingDataTable';
import SalesByCategoryChart from './SalesByCategoryChart';
import { TransactionType } from '@/app/generated/prisma';
import { getBillingDataAction } from '@/actions/transaction.action';
import { handleResponse } from '@/lib/handle-response';

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

    handleResponse(response, {
        onError: (errorMessage) => {
            console.error(
                'Fetch of billing information rejected:',
                errorMessage,
            );
        },
    });

    const [data] = response;

    if (data === null) return;

    return (
        <Stack>
            <PageHeader
                entityInPlural='Billing & Sales'
                subTitle='Track gym transactions, bills and sales.'
                formTitle='Log New Gym Equipment'
            />

            <BillingStats stats={data.stats} />

            <Group align='stretch'>
                <Box style={{ flex: 1 }}>
                    <BillingDataTable transactions={data.transactions} />
                </Box>

                <SalesByCategoryChart />
            </Group>
        </Stack>
    );
}
