import {
    Badge,
    Divider,
    Group,
    Modal,
    Stack,
    Text,
    ThemeIcon,
} from '@mantine/core';
import { IconCalendar, IconCategory } from '@tabler/icons-react';
import { Event } from './Schedule';

interface Props {
    event: Event;
    opened: boolean;
    close: () => void;
}

export default function DetailedViewAction({ event, opened, close }: Props) {
    return (
        <Modal
            opened={opened}
            onClose={close}
            title={<Text fw={700}>Equipment Details</Text>}
            centered
            size='md'
        >
            {event.equipment && (
                <Stack gap='md'>
                    <Group justify='space-between'>
                        <Text fw={600} size='lg'>
                            {event.equipment.name}
                        </Text>
                        <Badge color='blue' variant='light'>
                            {event.equipment.category}
                        </Badge>
                    </Group>

                    <Divider />

                    <Group wrap='nowrap'>
                        <ThemeIcon variant='light' color='gray' size='lg'>
                            <IconCategory size={20} />
                        </ThemeIcon>
                        <div>
                            <Text size='xs' c='dimmed'>
                                Category
                            </Text>
                            <Text size='sm' fw={500}>
                                {event.equipment.category}
                            </Text>
                        </div>
                    </Group>

                    <Group wrap='nowrap'>
                        <ThemeIcon variant='light' color='gray' size='lg'>
                            <IconCalendar size={20} />
                        </ThemeIcon>
                        <div>
                            <Text size='xs' c='dimmed'>
                                Event Schedule
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

                    <Divider />

                    <Stack gap={5}>
                        <Text size='xs' c='dimmed'>
                            Scheduled Work
                        </Text>
                        <Text
                            size='sm'
                            p='sm'
                            bg='gray.0'
                            style={{ borderRadius: '4px' }}
                        >
                            {event.title}
                        </Text>
                    </Stack>
                </Stack>
            )}
        </Modal>
    );
}
