import { Group, Paper, Select, Stack, TextInput, Title } from '@mantine/core';
import {
    IconFilter,
    IconSearch,
    IconSortDescending,
} from '@tabler/icons-react';

interface Props {
    filters: {
        search: string;
        category: string | null;
        status: string | null;
    };
    onFilterChange: (key: string, value: string | null) => void;
}

export default function EquipmentFilter({ filters, onFilterChange }: Props) {
    return (
        <Paper withBorder p='lg' radius='md' shadow='sm'>
            <Stack gap='md'>
                <Title order={4} fw={600}>
                    Quick Filter
                </Title>

                <Group align='flex-end' gap='md'>
                    <TextInput
                        label='Search'
                        placeholder='Search by name...'
                        leftSection={<IconSearch size={16} />}
                        value={filters.search}
                        onChange={(e) =>
                            onFilterChange('search', e.target.value)
                        }
                        style={{ flex: 1 }}
                        radius='md'
                    />

                    <Select
                        label='Category'
                        placeholder='All Categories'
                        leftSection={<IconFilter size={16} />}
                        value={filters.category}
                        onChange={(val) => onFilterChange('category', val)}
                        data={[
                            { label: 'Cardio', value: 'CARDIO' },
                            { label: 'Strength', value: 'STRENGTH' },
                            { label: 'Free Weights', value: 'FREE_WEIGHTS' },
                            { label: 'Recovery', value: 'RECOVERY' },
                        ]}
                        clearable
                        style={{ width: 200 }}
                        radius='md'
                    />

                    <Select
                        label='Status'
                        placeholder='Any Status'
                        leftSection={<IconSortDescending size={16} />}
                        value={filters.status}
                        onChange={(val) => onFilterChange('status', val)}
                        data={[
                            { label: 'Operational', value: 'OPERATIONAL' },
                            {
                                label: 'Maintenance Required',
                                value: 'MAINTENANCE_REQUIRED',
                            },
                            { label: 'Out of Order', value: 'OUT_OF_ORDER' },
                        ]}
                        clearable
                        style={{ width: 180 }}
                        radius='md'
                    />
                </Group>
            </Stack>
        </Paper>
    );
}
