import {
    Notification as MantineNotification,
    NotificationProps,
} from '@mantine/core';
import {
    IconCheckFilled,
    IconInfoCircle,
    IconXFilled,
    ReactNode,
} from '@tabler/icons-react';

type NotificationType = 'error' | 'success' | 'info';

interface Props extends NotificationProps {
    title: string;
    type: NotificationType;
}

const XIcon = <IconXFilled style={{ width: 18, height: 18 }} />;
const checkIcon = <IconCheckFilled style={{ width: 18, height: 18 }} />;
const infoIcon = <IconInfoCircle style={{ width: 18, height: 18 }} />;

export const notificationStyles: Record<
    NotificationType,
    { icon: ReactNode; color: string }
> = {
    error: { icon: XIcon, color: 'red' },
    success: { icon: checkIcon, color: 'green' },
    info: { icon: infoIcon, color: 'blue' },
};

export default function Notification({ title, type }: Props) {
    return (
        <MantineNotification
            title={title}
            icon={notificationStyles[type].icon}
        />
    );
}
