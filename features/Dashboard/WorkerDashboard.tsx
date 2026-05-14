'use client';

import {
    Stack,
    Title,
    SimpleGrid,
    Paper,
    Text,
    Group,
    Alert,
    ThemeIcon,
} from '@mantine/core';
import {
    IconCalendarTime,
    IconMessage2,
    IconInfoCircle,
    IconClock,
    IconBellRinging,
} from '@tabler/icons-react';
import { StatisticBlocks } from '@/components/StatisticBlocks';
import { PageHeader } from '@/components/PageHeader';

export default function WorkerDashboard() {
    const mockShifts = [
        {
            id: 's1',
            title: 'Opening Shift - Front Desk',
            start: new Date('2026-05-14T08:00:00'),
            end: new Date('2026-05-14T14:00:00'),
        },
        {
            id: 's2',
            title: 'Equipment Safety Walkthrough',
            start: new Date('2026-05-15T10:00:00'),
            end: new Date('2026-05-15T12:00:00'),
        },
        {
            id: 's3',
            title: 'Closing Shift',
            start: new Date('2026-05-17T16:00:00'),
            end: new Date('2026-05-17T22:00:00'),
        },
    ];

    const mockAnnouncements = [
        {
            id: 'a1',
            title: 'New Maintenance Protocol',
            content:
                'Please ensure all treadmill safety clips are inspected at the start of every shift following the new CAD maintenance schematics.',
            date: '2026-05-12',
            priority: 'blue',
        },
        {
            id: 'a2',
            title: 'Staff Meeting: Gym CRM Update',
            content:
                'We will be reviewing the new Role-Based Access Control features this Friday at 3:00 PM.',
            date: '2026-05-10',
            priority: 'orange',
        },
    ];

    const workerBlocks = [
        {
            title: 'Scheduled Shifts',
            value: mockShifts.length.toString(),
            icon: IconCalendarTime,
            color: 'blue',
        },
        {
            title: 'New Announcements',
            value: mockAnnouncements.length.toString(),
            icon: IconBellRinging,
            color: 'orange',
        },
    ];

    return (
        <Stack gap='xl'>
            <PageHeader
                entityInPlural='Worker Dashboard'
                subTitle='Track your assigned tasks, maintenance progress, and daily facility operations.'
            />

            <StatisticBlocks blocks={workerBlocks} />

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing='md'>
                <Paper withBorder p='md' radius='md'>
                    <Group mb='md'>
                        <ThemeIcon variant='light' color='blue'>
                            <IconClock size={18} />
                        </ThemeIcon>
                        <Text fw={600}>My Upcoming Schedule</Text>
                    </Group>

                    <Stack gap='sm'>
                        {mockShifts.map((shift) => (
                            <Paper key={shift.id} withBorder p='xs' bg='gray.0'>
                                <Group justify='space-between'>
                                    <Stack gap={0}>
                                        <Text size='sm' fw={700}>
                                            {shift.title}
                                        </Text>
                                        <Text size='xs' c='dimmed'>
                                            {shift.start.toLocaleDateString(
                                                'en-US',
                                                {
                                                    weekday: 'long',
                                                    month: 'short',
                                                    day: 'numeric',
                                                },
                                            )}
                                        </Text>
                                    </Stack>
                                    <Text size='sm' fw={600} c='blue'>
                                        {shift.start.toLocaleTimeString(
                                            'en-US',
                                            {
                                                hour: 'numeric',
                                                minute: '2-digit',
                                            },
                                        )}
                                    </Text>
                                </Group>
                            </Paper>
                        ))}
                    </Stack>
                </Paper>

                <Stack gap='md'>
                    <Group>
                        <ThemeIcon variant='light' color='orange'>
                            <IconMessage2 size={18} />
                        </ThemeIcon>
                        <Text fw={600}>Internal Bulletin Board</Text>
                    </Group>

                    {mockAnnouncements.map((note) => (
                        <Alert
                            key={note.id}
                            variant='light'
                            color={note.priority}
                            title={note.title}
                            icon={<IconInfoCircle size={18} />}
                        >
                            <Text size='sm' mb='xs'>
                                {note.content}
                            </Text>
                            <Text size='xs' c='dimmed'>
                                Posted:{' '}
                                {new Date(note.date).toLocaleDateString()}
                            </Text>
                        </Alert>
                    ))}
                </Stack>
            </SimpleGrid>
        </Stack>
    );
}
