import React from 'react';
import { Modal as MantineModal, Button, Group } from '@mantine/core';

interface Props {
    opened: boolean;
    onClose?: () => void;
    title: string;
    children: React.ReactNode;
    size?: string | number;
    centered?: boolean;
    confirmAction: () => void;
}

export function Modal({
    opened,
    onClose = () => {},
    title,
    children,
    size = 'md',
    centered = true,
    confirmAction,
}: Props) {
    return (
        <MantineModal
            opened={opened}
            onClose={onClose}
            title={title}
            size={size}
            centered={centered}
        >
            <div style={{ paddingBottom: '1rem' }}>{children}</div>

            <Group justify='flex-end' mt='md'>
                <Button variant='subtle' color='gray' onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={confirmAction}>Confirm</Button>
            </Group>
        </MantineModal>
    );
}
