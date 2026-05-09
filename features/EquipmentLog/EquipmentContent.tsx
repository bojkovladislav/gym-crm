import { Center, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { Equipment } from './EquipmentLog';
import { IconSearchOff } from '@tabler/icons-react';
import { EquipmentCard } from './EquipmentCard';

interface Props {
    equipment: Equipment[];
    removeEquipment: (id: string) => void;
    editEquipment: (
        id: string,
        name: string,
        category: string,
        serialNumber: string,
        location: string,
    ) => void;
}

export default function EquipmentContent({
    equipment,
    removeEquipment,
    editEquipment,
}: Props) {
    if (equipment.length === 0) {
        return (
            <Center py={100}>
                <Stack align='center' gap='xs'>
                    <IconSearchOff size={48} color='gray' stroke={1.5} />
                    <Title order={3}>No equipment found</Title>
                    <Text c='dimmed'>
                        Try adjusting your filters or adding a new unit.
                    </Text>
                </Stack>
            </Center>
        );
    }

    return (
        <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 3 }}
            spacing='lg'
            verticalSpacing='lg'
        >
            {equipment.map((item) => (
                <EquipmentCard
                    key={item.id}
                    equipment={item}
                    editEquipment={editEquipment}
                    removeEquipment={removeEquipment}
                />
            ))}
        </SimpleGrid>
    );
}
