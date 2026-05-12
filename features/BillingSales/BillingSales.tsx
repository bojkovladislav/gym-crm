import { PageHeader } from '@/components/PageHeader';
import { Box, Group, Stack } from '@mantine/core';
import BillingStats from './BillingStats';
import BillingDataTable from './BillingDataTable';
import SalesByCategoryChart from './SalesByCategoryChart';

export default function BillingSales() {
    return (
        <Stack>
            <PageHeader
                entityInPlural='Billing & Sales'
                subTitle='Track gym transactions, bills and sales.'
                formTitle='Log New Gym Equipment'
            />

            <BillingStats stats={[]} />

            <Group align='stretch'>
                <Box style={{ flex: 1 }}>
                    <BillingDataTable />
                </Box>

                <SalesByCategoryChart />
            </Group>
        </Stack>
    );
}
