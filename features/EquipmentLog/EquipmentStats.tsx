import { Group, Paper, Text, ThemeIcon, SimpleGrid } from '@mantine/core';
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

    return (
        <SimpleGrid cols={{ base: 1, xs: 2, md: 5 }} mb='xl'>
            {items.map((item) => {
                const Icon = item.icon;

                return (
                    <Paper withBorder p='md' radius='md' key={item.title}>
                        <Group justify='space-between'>
                            <div>
                                <Text
                                    c='dimmed'
                                    tt='uppercase'
                                    fw={700}
                                    fz='xs'
                                >
                                    {item.title}
                                </Text>
                                <Text fw={700} fz='xl'>
                                    {item.value.toLocaleString()}
                                </Text>
                            </div>
                            <ThemeIcon
                                color='gray'
                                variant='light'
                                style={{
                                    color: `var(--mantine-color-${item.color}-filled)`,
                                }}
                                size='xl'
                                radius='md'
                            >
                                <Icon size='1.8rem' stroke={1.5} />
                            </ThemeIcon>
                        </Group>
                    </Paper>
                );
            })}
        </SimpleGrid>
    );
}
