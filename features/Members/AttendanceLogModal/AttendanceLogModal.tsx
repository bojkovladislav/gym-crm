import {
    Group,
    Modal,
    ScrollArea,
    Stack,
    Text,
    ThemeIcon,
    Timeline,
} from '@mantine/core';
import { Visit } from '../Members';
import { IconCalendarCheck } from '@tabler/icons-react';

interface Props {
    visits: Visit[] | null;
    opened: boolean;
    onClose: () => void;
}

export default function AttendanceLogModal({ opened, onClose, visits }: Props) {
    const hasVisits = visits && visits.length > 0;

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={
                <Text fw={700} size='lg'>
                    Attendance Log
                </Text>
            }
            centered
            size='md'
        >
            <ScrollArea.Autosize type='hover'>
                <Stack p='xs'>
                    {hasVisits ? (
                        <Timeline bulletSize={24} lineWidth={2} active={0}>
                            {visits.map((visit) => {
                                const dateObj = new Date(visit.visitDate);

                                return (
                                    <Timeline.Item
                                        key={visit.id}
                                        bullet={
                                            <ThemeIcon
                                                size={22}
                                                radius='xl'
                                                color='teal'
                                            >
                                                <IconCalendarCheck size={14} />
                                            </ThemeIcon>
                                        }
                                        title={dateObj.toLocaleDateString(
                                            undefined,
                                            {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            },
                                        )}
                                    >
                                        <Text size='xs' c='dimmed'>
                                            Checked in at{' '}
                                            {dateObj.toLocaleTimeString(
                                                undefined,
                                                {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                },
                                            )}
                                        </Text>
                                    </Timeline.Item>
                                );
                            })}
                        </Timeline>
                    ) : (
                        <Group justify='center' py='xl'>
                            <Text c='dimmed' size='sm' ta='center'>
                                No check-ins recorded yet for this member.
                            </Text>
                        </Group>
                    )}
                </Stack>
            </ScrollArea.Autosize>
        </Modal>
    );
}
