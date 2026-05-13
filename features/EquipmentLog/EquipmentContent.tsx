import { Center, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { Equipment, MaintenanceRequestData } from './EquipmentLog';
import { IconSearchOff } from '@tabler/icons-react';
import { EquipmentCard } from './EquipmentCard';
import { BaseFormConfig } from '@/components/ActionForm/ActionForm';

interface Props {
    equipment: Equipment[];
    readOnly: boolean;
    inputs: BaseFormConfig[];
    removeEquipment: (id: string) => void;
    requestMaintenance: (id: string, data: MaintenanceRequestData) => void;
    editEquipment: (id: string, data: Equipment) => void;
}

export default function EquipmentContent({
    equipment,
    removeEquipment,
    requestMaintenance,
    readOnly,
    editEquipment,
    inputs,
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
                    readOnly={readOnly}
                    key={item.id}
                    equipment={item}
                    editEquipment={editEquipment}
                    inputs={inputs}
                    removeEquipment={removeEquipment}
                    requestMaintenance={requestMaintenance}
                />
            ))}
        </SimpleGrid>
    );
}
