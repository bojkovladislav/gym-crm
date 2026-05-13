'use client';

import { Badge, Card, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { Equipment, MaintenanceRequestData } from './EquipmentLog';
import { ActionMenu } from '../ActionMenu';
import ActionForm, { BaseFormConfig } from '@/components/ActionForm/ActionForm';
import { getEquipmentActions, maintenanceInputs } from './equipment.config';
import { IconHash, IconMapPin } from '@tabler/icons-react';
import { useState } from 'react';

interface Props {
    equipment: Equipment;
    readOnly: boolean;
    inputs: BaseFormConfig[];
    requestMaintenance: (id: string, data: MaintenanceRequestData) => void;
    removeEquipment: (id: string) => void;
    editEquipment: (id: string, data: Equipment) => void;
}

export function EquipmentCard({
    equipment,
    readOnly,
    inputs,
    requestMaintenance,
    removeEquipment,
    editEquipment,
}: Props) {
    const [equipmentToRepair, setEquipmentToRepair] =
        useState<Equipment | null>(null);

    const handleMaintenanceFormOpen = () => {
        setEquipmentToRepair(equipment);
    };

    const handleMaintenanceFormSubmit = (data: MaintenanceRequestData) => {
        if (equipmentToRepair === null) return;

        requestMaintenance(equipmentToRepair.id, data);
    };

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

            {!readOnly && (
                <Group justify='flex-end' mt='lg'>
                    <ActionMenu
                        currentObject={equipment}
                        inputs={inputs}
                        actions={getEquipmentActions(
                            removeEquipment,
                            handleMaintenanceFormOpen,
                            equipment.status,
                        )}
                        editObject={editEquipment}
                    />
                </Group>
            )}

            {equipmentToRepair && (
                <ActionForm
                    inputs={maintenanceInputs}
                    title='Request an equipment maintenance'
                    onSubmit={handleMaintenanceFormSubmit}
                    onClose={() => setEquipmentToRepair(null)}
                    isOpened={!!equipmentToRepair}
                />
            )}
        </Card>
    );
}
