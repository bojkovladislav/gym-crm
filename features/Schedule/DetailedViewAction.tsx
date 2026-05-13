import {
    Badge,
    Divider,
    Group,
    Modal,
    Stack,
    Text,
    ThemeIcon,
} from '@mantine/core';
import {
    IconBarbell,
    IconCalendar,
    IconCategory,
    IconNotes,
    IconUser,
} from '@tabler/icons-react';
import { Event } from './Schedule';

interface Props {
    event: Event;
    opened: boolean;
    close: () => void;
}

export default function DetailedViewAction({ event, opened, close }: Props) {
    const isTraining = event.type === 'TRAINER_SESSION';

    return (
        <Modal
            opened={opened}
            onClose={close}
            title={
                <Text fw={700}>
                    {isTraining ? 'Session Details' : 'Equipment Details'}
                </Text>
            }
            centered
            size='md'
        >
            <Stack gap='md'>
                <Group justify='space-between'>
                    <Text fw={600} size='lg'>
                        {isTraining
                            ? event.memberName || 'Private Client'
                            : event.equipment?.name}
                    </Text>
                    <Badge color={isTraining ? 'teal' : 'blue'} variant='light'>
                        {isTraining
                            ? 'Training Session'
                            : event.equipment?.category}
                    </Badge>
                </Group>

                <Divider />

                <Group wrap='nowrap'>
                    <ThemeIcon variant='light' color='gray' size='lg'>
                        {isTraining ? (
                            <IconUser size={20} />
                        ) : (
                            <IconCategory size={20} />
                        )}
                    </ThemeIcon>
                    <div>
                        <Text size='xs' c='dimmed'>
                            {isTraining ? 'Client Name' : 'Category'}
                        </Text>
                        <Text size='sm' fw={500}>
                            {isTraining
                                ? event.memberName
                                : event.equipment?.category}
                        </Text>
                    </div>
                </Group>

                <Group wrap='nowrap'>
                    <ThemeIcon variant='light' color='gray' size='lg'>
                        <IconCalendar size={20} />
                    </ThemeIcon>
                    <div>
                        <Text size='xs' c='dimmed'>
                            Scheduled Time
                        </Text>
                        <Text size='sm' fw={500}>
                            {event.start.toLocaleDateString()} at{' '}
                            {event.start.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </Text>
                    </div>
                </Group>

                {isTraining && event.description && (
                    <Group wrap='nowrap'>
                        <ThemeIcon variant='light' color='gray' size='lg'>
                            <IconNotes size={20} />
                        </ThemeIcon>
                        <div style={{ flex: 1 }}>
                            <Text size='xs' c='dimmed'>
                                Session Notes
                            </Text>
                            <Text size='sm'>{event.description}</Text>
                        </div>
                    </Group>
                )}

                <Divider />

                <Stack gap={5}>
                    <Group gap={5}>
                        <IconBarbell size={14} color='gray' />
                        <Text size='xs' c='dimmed'>
                            {isTraining ? 'Workout Focus' : 'Scheduled Work'}
                        </Text>
                    </Group>
                    <Text
                        size='sm'
                        p='sm'
                        bg='gray.0'
                        style={{
                            borderRadius: '4px',
                            borderLeft:
                                '3px solid var(--mantine-color-blue-filled)',
                        }}
                    >
                        {event.title}
                    </Text>
                </Stack>
            </Stack>
        </Modal>
    );
}
