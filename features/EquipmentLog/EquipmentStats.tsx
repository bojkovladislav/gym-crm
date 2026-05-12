import { StatisticBlocks } from '@/components/StatisticBlocks';
import {
    IconArmchair,
    IconCheck,
    IconTools,
    IconStar,
    IconAlertTriangle,
} from '@tabler/icons-react';

export interface EquipmentStatsData {
    total: number;
    operational: number;
    maintenance: number;
    outOfOrder: number;
    newAdditions: number;
}

interface Props {
    stats: EquipmentStatsData | null;
}

export function EquipmentStats({ stats }: Props) {
    const items = [
        {
            title: 'Total Units',
            value: stats?.total || 0,
            icon: IconArmchair,
            color: 'blue',
        },
        {
            title: 'Operational',
            value: stats?.operational || 0,
            icon: IconCheck,
            color: 'teal',
        },
        {
            title: 'Maintenance',
            value: stats?.maintenance || 0,
            icon: IconTools,
            color: 'orange',
        },
        {
            title: 'Out of Order',
            value: stats?.outOfOrder || 0,
            icon: IconAlertTriangle,
            color: 'red',
        },
        {
            title: 'New Additions',
            value: stats?.newAdditions || 0,
            icon: IconStar,
            color: 'yellow',
        },
    ];

    return <StatisticBlocks blocks={items} />;
}
