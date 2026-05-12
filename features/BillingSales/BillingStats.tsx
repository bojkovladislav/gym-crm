import { StatisticBlocks } from '@/components/StatisticBlocks';
import {
    IconArrowDownRight,
    IconArrowUpRight,
    IconCash,
    IconReceipt2,
    IconRefresh,
} from '@tabler/icons-react';

interface Props {
    stats: any;
}

export default function BillingStats({ stats }: Props) {
    const items = [
        {
            title: 'Total Revenue',
            // Sum of all INCOME type transactions
            value: `$${stats?.totalRevenue?.toLocaleString() || 0}`,
            icon: IconCash,
            color: 'blue',
        },
        {
            title: 'Net Profit',
            // Total Income - Total Expenses
            value: `$${stats?.netProfit?.toLocaleString() || 0}`,
            icon: IconArrowUpRight,
            color: 'teal',
        },
        {
            title: 'Operational Costs',
            // Sum of all EXPENSE type transactions
            value: `$${stats?.totalExpenses?.toLocaleString() || 0}`,
            icon: IconArrowDownRight,
            color: 'red',
        },
        {
            title: 'Pending Renewals',
            // Count of members with autoRenew: true whose sub ends soon
            value: stats?.pendingRenewals || 0,
            icon: IconRefresh,
            color: 'orange',
        },
        {
            title: 'Transactions',
            // Total count of transaction records this month
            value: stats?.transactionCount || 0,
            icon: IconReceipt2,
            color: 'indigo',
        },
    ];

    return <StatisticBlocks blocks={items} />;
}
