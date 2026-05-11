'use client';

import { Menu, Text } from '@mantine/core';
import { Event } from './Schedule';
import {
    IconCheck,
    IconInfoCircle,
    IconTools,
    IconUser,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import DetailedViewAction from './DetailedViewAction';

interface Props {
    event: Event;
    handleCompleteEvent: (eventId: string) => void;
}

export default function EventActions({ event, handleCompleteEvent }: Props) {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Menu.Dropdown>
                <Menu.Label>Event Actions</Menu.Label>

                {!event.isCompleted ? (
                    <Menu.Item
                        color='green'
                        leftSection={<IconCheck size={16} />}
                        onClick={() => handleCompleteEvent(event.id)}
                    >
                        Mark as Completed
                    </Menu.Item>
                ) : (
                    <Menu.Item
                        disabled
                        leftSection={<IconInfoCircle size={16} />}
                    >
                        Already Processed
                    </Menu.Item>
                )}

                <Menu.Divider />

                <Menu.Label>Quick Glance</Menu.Label>
                <Menu.Item
                    leftSection={
                        event.type === 'MAINTENANCE' ? (
                            <IconTools size={16} />
                        ) : (
                            <IconUser size={16} />
                        )
                    }
                >
                    Type: {event.type}
                </Menu.Item>

                <Menu.Item
                    leftSection={
                        <Text size='xs' fw={700}>
                            $
                        </Text>
                    }
                >
                    Amount: ${event.amount}
                </Menu.Item>

                {event.equipment && (
                    <>
                        <Menu.Divider />
                        <Menu.Label>Asset Management</Menu.Label>
                        <Menu.Item
                            leftSection={<IconInfoCircle size={16} />}
                            onClick={open}
                        >
                            View detailed information
                        </Menu.Item>
                    </>
                )}
            </Menu.Dropdown>

            <DetailedViewAction event={event} opened={opened} close={close} />
        </>
    );
}
