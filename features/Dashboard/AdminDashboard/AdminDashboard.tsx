'use client';

import { useEffect, useState } from 'react';
import {
    Group,
    Stack,
    SimpleGrid,
    Title,
    Loader,
    Center,
    Button,
    useMantineTheme,
} from '@mantine/core';
import {
    IconSettingsAutomation,
    IconAlertTriangle,
    IconCalendarEvent,
    IconPlus,
    IconTool,
} from '@tabler/icons-react';
import { getAdminDashboardStatsAction } from '@/actions/dashboard.action';
import { StatisticBlocks } from '@/components/StatisticBlocks';
import Link from 'next/link';
import EquipmentStatusChart from './EquipmentStatusChart';
import OperationalActivityChart from './OperationalActivityChart';
import { PageHeader } from '@/components/PageHeader';
import { EquipmentStatus } from '@/app/generated/prisma';
import { handleResponse } from '@/lib/handle-response';

export interface AdminStats {
    equipmentStats: {
        status: string;
        _count: {
            _all: number;
        };
    }[];
    appointmentsToday: number;
    pendingMaintenance: number;
}
[];

export default function AdminDashboard() {
    const [stats, setStats] = useState<AdminStats>({
        equipmentStats: [],
        appointmentsToday: 0,
        pendingMaintenance: 0,
    });
    const [loading, setLoading] = useState(true);
    const theme = useMantineTheme();

    useEffect(() => {
        async function loadData() {
            setLoading(true);

            const response = await getAdminDashboardStatsAction();
            const [data] = response;

            handleResponse(response, {
                onSuccess: () => {
                    setStats(data as unknown as AdminStats);
                },
                onError: (errorMessage) => {
                    console.error('Fetch Admin Stats rejected:', errorMessage);
                },
            });

            setLoading(false);
        }
        loadData();
    }, []);

    if (loading) {
        return (
            <Center h={400}>
                <Loader color='blue' size='xl' type='dots' />
            </Center>
        );
    }

    const operationalCount =
        stats.equipmentStats.find(
            (s) => s.status === EquipmentStatus.OPERATIONAL,
        )?._count._all || 0;
    const maintenanceCount =
        stats.equipmentStats.find(
            (s) => s.status === EquipmentStatus.UNDER_MAINTENANCE,
        )?._count._all || 0;

    const adminBlocks = [
        {
            title: "Today's Sessions",
            value: stats.appointmentsToday.toString(),
            icon: IconCalendarEvent,
            color: 'blue',
        },
        {
            title: 'Downed Equipment',
            value: maintenanceCount.toString(),
            icon: IconAlertTriangle,
            color: 'red',
        },
        {
            title: 'Active Maintenance',
            value: stats.pendingMaintenance.toString(),
            icon: IconSettingsAutomation,
            color: 'orange',
        },
        {
            title: 'Equipment Uptime',
            value: `${((operationalCount / (operationalCount + maintenanceCount || 1)) * 100).toFixed(0)}%`,
            icon: IconTool,
            color: 'teal',
        },
    ];

    const equipmentData = [
        {
            name: 'Operational',
            value: operationalCount,
            color: theme.colors.teal[6],
        },
        {
            name: 'Under Repair',
            value: maintenanceCount,
            color: theme.colors.red[6],
        },
    ];

    return (
        <Stack gap='xl'>
            <PageHeader
                entityInPlural='Admin Dashboard'
                subTitle='Oversee gym operations, manage equipment, track maintenance, and monitor daily activity.'
            />

            <Group justify='space-between'>
                <Title order={2}>Operational Control</Title>
                <Group>
                    <Button
                        component={Link}
                        href='/equipment'
                        leftSection={<IconPlus size={16} />}
                        variant='light'
                    >
                        Add Equipment
                    </Button>

                    <Button
                        component={Link}
                        href='/equipment'
                        leftSection={<IconTool size={16} />}
                        variant='filled'
                    >
                        New Task
                    </Button>
                </Group>
            </Group>

            <StatisticBlocks blocks={adminBlocks} />

            <SimpleGrid cols={{ base: 1, lg: 2 }} spacing='md'>
                <EquipmentStatusChart equipmentData={equipmentData} />
                <OperationalActivityChart
                    stats={stats}
                    fillColor={theme.colors.blue[6]}
                />
            </SimpleGrid>
        </Stack>
    );
}
