import { notificationStyles } from '@/components/Notification/Notification';
import { ActionResponse } from '@/helpers/createSafeAction';
import { notifications } from '@mantine/notifications';

interface ClientHandleOptions<T> {
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
    successMessage?: string;
}

export function handleResponse<T>(
    response: ActionResponse<T>,
    options?: ClientHandleOptions<T>,
) {
    const [data, error] = response;

    if (error) {
        notifications.show({
            title: 'Error',
            message: error,
            ...notificationStyles.error,
        });
        options?.onError?.(error);

        return;
    }

    if (options?.successMessage) {
        notifications.show({
            title: 'Success',
            message: options.successMessage,
            ...notificationStyles.success,
        });
    }

    if (data !== null) {
        options?.onSuccess?.(data);
    }
}
