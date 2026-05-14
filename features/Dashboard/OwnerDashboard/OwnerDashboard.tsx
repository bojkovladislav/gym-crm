'use client';

import { useEffect, useState } from 'react';
import { Stack, SimpleGrid, Text, Button } from '@mantine/core';
import {
    IconArrowRight,
    IconCash,
    IconCreditCard,
    IconReceipt2,
    IconTrendingUp,
    IconUsers,
} from '@tabler/icons-react';
import { getOwnerDashboardStatsAction } from '@/actions/dashboard.action';
import { StatisticBlocks } from '@/components/StatisticBlocks';
import { ChartData, FinancialTrendChart } from './FinancialTrendChart';
import { RevenueDistribution, RevenueSource } from './RevenueDistribution';
import { PageHeader } from '@/components/PageHeader';
import Link from 'next/link';

interface OwnerStats {
    revenue: number;
    expenses: number;
    profit: number;
    totalMembers: number;
    revenueSources: RevenueSource[];
    monthlyTrade: ChartData[];
}
[];

export default function OwnerDashboard() {
    const [stats, setStats] = useState<OwnerStats>({
        revenue: 0,
        expenses: 0,
        profit: 0,
        totalMembers: 0,
        revenueSources: [],
        monthlyTrade: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const res = await getOwnerDashboardStatsAction();

            if (res.success && res.data) {
                setStats(res.data as unknown as OwnerStats);
            }
            setLoading(false);
        }
        loadData();
    }, []);

    if (loading) return <Text>Loading Executive Overview...</Text>;

    const ownerBlocks = [
        {
            title: 'Gross Revenue',
            value: `$${stats.revenue.toLocaleString()}`,
            icon: IconCash,
            color: 'green',
        },
        {
            title: 'Total Expenses',
            value: `$${stats.expenses.toLocaleString()}`,
            icon: IconCreditCard,
            color: 'red',
        },
        {
            title: 'Net Profit',
            value: `$${stats.profit.toLocaleString()}`,
            icon: IconTrendingUp,
            color: stats.profit >= 0 ? 'blue' : 'orange',
        },
        {
            title: 'Total Members',
            value: stats.totalMembers.toString(),
            icon: IconUsers,
            color: 'teal',
        },
    ];

    return (
        <Stack gap='xl'>
            <PageHeader
                entityInPlural='Dashboard'
                subTitle='View your gym performance, revenue, members, and business insights in one place.'
            />

            <StatisticBlocks blocks={ownerBlocks} />

            <SimpleGrid cols={{ base: 1, lg: 2 }} spacing='md' mt='xl'>
                <FinancialTrendChart data={stats.monthlyTrade} />

                <RevenueDistribution data={stats.revenueSources} />
            </SimpleGrid>

            <Button
                component={Link}
                href='/billing-sales'
                variant='light'
                color='blue'
                rightSection={<IconArrowRight size={16} />}
                leftSection={<IconReceipt2 size={16} />}
            >
                View All Sales & Billing
            </Button>
        </Stack>
    );
}
