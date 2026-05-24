import { getUserPaycheckStatsAction } from '@/actions/paycheck.action';
import { PageHeader } from '@/components/PageHeader';
import { StatisticBlocks } from '@/components/StatisticBlocks';
import { StatisticBlockType } from '@/components/StatisticBlocks/StatisticBlocks';
import { getSessionOnServer } from '@/lib/auth-server';
import { handleResponse } from '@/lib/handle-response';
import { Group, Paper, Stack, Text } from '@mantine/core';
import { IconCash, IconChartArrows, IconUserCheck } from '@tabler/icons-react';

export default async function Earnings() {
    const session = await getSessionOnServer();

    if (!session?.user?.id) {
        throw new Error('Unauthorized! The session has expired!');
    }

    const response = await getUserPaycheckStatsAction(session.user.id);
    const [data] = response;

    handleResponse(response);

    if (data === null) return;

    const stats: StatisticBlockType[] = [
        {
            title: 'Total Paid out',
            value: `$${data.totalEarnings.toLocaleString()}`,
            icon: IconCash,
            color: 'blue',
        },
        {
            title: 'Monthly Base',
            value: `$${data.baseSalary.toLocaleString()}`,
            icon: IconChartArrows,
            color: 'grape',
        },
        {
            title: 'Status',
            value: 'Active',
            icon: IconUserCheck,
            color: 'cyan',
        },
    ];

    return (
        <Stack gap='lg'>
            <PageHeader
                entityInPlural='Earnings'
                subTitle='Track your payouts, commissions, and performance'
            />

            <StatisticBlocks blocks={stats} />

            <Paper withBorder p='md' radius='md'>
                <Group justify='space-between' mb='md'>
                    <Text fw={700} size='lg'>
                        Earnings History
                    </Text>
                </Group>

                <Text c='dimmed' size='sm' ta='center' py='xl'>
                    No recent payouts found for the selected period.
                </Text>
            </Paper>
        </Stack>
    );
}
