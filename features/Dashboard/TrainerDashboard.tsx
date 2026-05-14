'use client';

import { useEffect, useState } from 'react';
import {
    Group,
    Stack,
    SimpleGrid,
    Paper,
    Text,
    Loader,
    Center,
    Badge,
    Table,
    ThemeIcon,
} from '@mantine/core';
import {
    IconCalendarStats,
    IconCash,
    IconUsers,
    IconClock,
    IconCheck,
} from '@tabler/icons-react';
import { StatisticBlocks } from '@/components/StatisticBlocks';
import { getTrainerDashboardStatsAction } from '@/actions/dashboard.action';
import { PageHeader } from '@/components/PageHeader';

interface UpcomingSession {
    id: string;
    start: Date;
    memberName: string;
}

interface TrainerStats {
    baseSalary: number;
    sessionRate: number;
    upcomingSessions: UpcomingSession[];
    completedSessionsCount: number;
    pendingCommission: number;
}

interface Props {
    userId: string;
}

export default function TrainerDashboard({ userId }: Props) {
    const [stats, setStats] = useState<TrainerStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const res = await getTrainerDashboardStatsAction(userId);

            if (res.success && res.data) {
                setStats(res.data as unknown as TrainerStats);
            }

            setLoading(false);
        }

        loadData();
    }, [userId]);

    if (loading || !stats) {
        return (
            <Center h={400}>
                <Loader color='blue' size='xl' type='dots' />
            </Center>
        );
    }

    const trainerBlocks = [
        {
            title: 'Monthly Sessions',
            value: stats.completedSessionsCount.toString(),
            icon: IconCalendarStats,
            color: 'blue',
        },
        {
            title: 'Pending Commission',
            value: `$${stats.pendingCommission.toLocaleString()}`,
            icon: IconCash,
            color: 'green',
        },
        {
            title: 'Session Rate',
            value: `$${stats.sessionRate}/hr`,
            icon: IconClock,
            color: 'violet',
        },
        {
            title: 'Base Salary',
            value: `$${stats.baseSalary.toLocaleString()}`,
            icon: IconCheck,
            color: 'teal',
        },
    ];

    return (
        <Stack gap='xl'>
            <PageHeader
                entityInPlural='Trainer Dashboard'
                subTitle='Track your sessions, earnings, upcoming clients, and training performance.'
            />

            <StatisticBlocks blocks={trainerBlocks} />

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing='md'>
                <Paper withBorder p='md' radius='md'>
                    <Group justify='space-between' mb='md'>
                        <Text fw={500}>Upcoming Sessions</Text>

                        <Badge color='blue' variant='light'>
                            Next 5
                        </Badge>
                    </Group>

                    {stats.upcomingSessions.length > 0 ? (
                        <Table verticalSpacing='sm'>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Client</Table.Th>
                                    <Table.Th>Time</Table.Th>
                                </Table.Tr>
                            </Table.Thead>

                            <Table.Tbody>
                                {stats.upcomingSessions.map((session) => (
                                    <Table.Tr key={session.id}>
                                        <Table.Td>
                                            <Group gap='xs'>
                                                <ThemeIcon
                                                    size='sm'
                                                    variant='light'
                                                    color='blue'
                                                >
                                                    <IconUsers size={12} />
                                                </ThemeIcon>

                                                <Text size='sm'>
                                                    {session.memberName}
                                                </Text>
                                            </Group>
                                        </Table.Td>

                                        <Table.Td>
                                            <Text size='sm'>
                                                {new Date(
                                                    session.start,
                                                ).toLocaleString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: '2-digit',
                                                    hour12: true,
                                                })}
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    ) : (
                        <Center h={100}>
                            <Text c='dimmed' size='sm'>
                                No upcoming sessions scheduled.
                            </Text>
                        </Center>
                    )}
                </Paper>

                <Paper withBorder p='md' radius='md'>
                    <Text fw={500} mb='md'>
                        Earnings Breakdown
                    </Text>

                    <Stack gap='xs'>
                        <Group justify='space-between'>
                            <Text size='sm'>Base Salary (Static):</Text>

                            <Text size='sm' fw={700}>
                                ${stats.baseSalary.toLocaleString()}
                            </Text>
                        </Group>

                        <Group justify='space-between'>
                            <Text size='sm'>
                                Commission ({stats.completedSessionsCount}{' '}
                                sessions):
                            </Text>

                            <Text size='sm' fw={700} c='green'>
                                + ${stats.pendingCommission.toLocaleString()}
                            </Text>
                        </Group>

                        <Group
                            justify='space-between'
                            pt='xs'
                            style={{
                                borderTop:
                                    '1px solid var(--mantine-color-gray-3)',
                            }}
                        >
                            <Text fw={700}>Estimated Payout:</Text>

                            <Text fw={700} size='lg' c='blue'>
                                $
                                {(
                                    stats.baseSalary + stats.pendingCommission
                                ).toLocaleString()}
                            </Text>
                        </Group>
                    </Stack>
                </Paper>
            </SimpleGrid>
        </Stack>
    );
}
