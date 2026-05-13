import { Group, Menu, Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { Event } from './Schedule';
import EventActions from './EventActions';

interface Props {
    event: Event;
    readOnly: boolean;
    handleCompleteEvent: (eventId: string) => void;
}

export default function EventMenu({
    event,
    handleCompleteEvent,
    readOnly,
}: Props) {
    return (
        <Menu shadow='md' width={220} position='right-start' withArrow>
            <Menu.Target>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        padding: '2px 4px',
                        textDecoration: event.isCompleted
                            ? 'line-through'
                            : 'none',
                    }}
                >
                    <Group justify='space-between' wrap='nowrap'>
                        <Text size='xs' truncate fw={600} c='white'>
                            {event.title}
                        </Text>
                        {event.isCompleted && (
                            <IconCheck size={12} color='white' />
                        )}
                    </Group>
                </div>
            </Menu.Target>

            <EventActions
                event={event}
                readOnly={readOnly}
                handleCompleteEvent={handleCompleteEvent}
            />
        </Menu>
    );
}
