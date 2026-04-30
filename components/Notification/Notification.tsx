import { Text } from '@mantine/core';

interface Props {
    type: 'success' | 'fail';
    message: string;
}

export default function Notification({ type, message }: Props) {
    return (
        <Text
            size='sm'
            mt='xs'
            fw={500}
            style={{ color: type === 'success' ? 'green' : 'red' }}
        >
            {message}
        </Text>
    );
}
