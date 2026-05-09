import {
    ActionIcon,
    Badge,
    Card,
    Group,
    Menu,
    Stack,
    Text,
    ThemeIcon,
} from '@mantine/core';
import { Equipment } from './EquipmentLog';
import {
    IconDotsVertical,
    IconEdit,
    IconHash,
    IconMapPin,
    IconTrash,
} from '@tabler/icons-react';

interface Props {
    equipment: Equipment;
    removeEquipment: (id: string) => void;
    editEquipment: (
        id: string,
        name: string,
        category: string,
        serialNumber: string,
        location: string,
    ) => void;
}

export function EquipmentCard({
    equipment,
    removeEquipment,
    editEquipment,
}: Props) {
    const statusColors: Record<string, string> = {
        OPERATIONAL: 'teal',
        MAINTENANCE_REQUIRED: 'orange',
        OUT_OF_ORDER: 'red',
    };

    return (
        <Card withBorder padding='lg' radius='md' shadow='sm'>
            <Card.Section withBorder inheritPadding py='xs'>
                <Group justify='space-between'>
                    <Text fw={700} fz='lg'>
                        {equipment.name}
                    </Text>
                    <Badge
                        color={statusColors[equipment.status] || 'gray'}
                        variant='light'
                    >
                        {equipment.status.replace('_', ' ')}
                    </Badge>
                </Group>
            </Card.Section>

            <Stack gap='sm' mt='md'>
                <Group gap='xs'>
                    <ThemeIcon variant='light' color='blue' size='sm'>
                        <IconMapPin size={12} />
                    </ThemeIcon>
                    <Text size='sm' c='dimmed'>
                        Location:{' '}
                        <Text span c='black' fw={500}>
                            {equipment.location || 'N/A'}
                        </Text>
                    </Text>
                </Group>

                <Group gap='xs'>
                    <ThemeIcon variant='light' color='gray' size='sm'>
                        <IconHash size={12} />
                    </ThemeIcon>
                    <Text size='sm' c='dimmed'>
                        S/N:{' '}
                        <Text span c='black' fw={500}>
                            {equipment.serialNumber || 'N/A'}
                        </Text>
                    </Text>
                </Group>

                <Group gap='xs'>
                    <Text size='sm' c='dimmed'>
                        Category:
                    </Text>
                    <Badge variant='outline' size='xs'>
                        {equipment.category}
                    </Badge>
                </Group>
            </Stack>

            <Group justify='flex-end' mt='lg'>
                <Menu position='bottom-end' shadow='md'>
                    <Menu.Target>
                        <ActionIcon variant='subtle' color='gray'>
                            <IconDotsVertical size={16} />
                        </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>Actions</Menu.Label>
                        <Menu.Item leftSection={<IconEdit size={14} />}>
                            Edit Details
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<IconTrash size={14} />}
                            color='red'
                        >
                            Remove
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Card>
    );
}
