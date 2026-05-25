import { StatisticBlocks } from '@/components/StatisticBlocks';
import {
    IconArrowDownRight,
    IconArrowUpRight,
    IconCash,
    IconReceipt2,
    IconRefresh,
} from '@tabler/icons-react';

interface Props {
    stats: Record<string, number> | null;
}

export default function BillingStats({ stats }: Props) {
    const items = [
        {
            title: 'Total Revenue',
            value: `$${stats?.totalRevenue?.toLocaleString() || 0}`,
            icon: IconCash,
            color: 'blue',
        },
        {
            title: 'Net Profit',
            value: `$${stats?.netProfit?.toLocaleString() || 0}`,
            icon: IconArrowUpRight,
            color: 'teal',
        },
        {
            title: 'Operational Costs',
            value: `$${stats?.operationalCosts?.toLocaleString() || 0}`,
            icon: IconArrowDownRight,
            color: 'red',
        },
        {
            title: 'Pending Renewals',
            value: stats?.pendingRenewals || 0,
            icon: IconRefresh,
            color: 'orange',
        },
        {
            title: 'Transactions',
            value: stats?.transactionCount || 0,
            icon: IconReceipt2,
            color: 'indigo',
        },
    ];

    return <StatisticBlocks blocks={items} />;
}
