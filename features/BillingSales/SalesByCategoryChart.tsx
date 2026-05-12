'use client';

import { Paper, Text, Group, Stack, Badge } from '@mantine/core';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from 'recharts';

const mockData = [
    { name: 'Subscriptions', value: 4500, color: '#228be6' },
    { name: 'Trainer Sessions', value: 2100, color: '#40c057' },
    { name: 'Maintenance', value: 800, color: '#fa5252' },
    { name: 'Other', value: 300, color: '#fab005' },
];

export default function SalesByCategoryChart() {
    return (
        <Paper withBorder radius='md' p='md' h='100%'>
            <Stack gap='xs'>
                <div style={{ height: 300, width: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={mockData}
                                cx='50%'
                                cy='50%'
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey='value'
                            >
                                {mockData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '8px',
                                    border: 'none',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                }}
                            />
                            <Legend verticalAlign='bottom' height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <Stack gap={10} mt='md'>
                    {mockData.map((item) => (
                        <Group key={item.name} justify='space-between'>
                            <Group gap='xs'>
                                <Badge
                                    color={item.color}
                                    variant='filled'
                                    size='xs'
                                    circle
                                />
                                <Text size='sm' fw={500}>
                                    {item.name}
                                </Text>
                            </Group>
                            <Text size='sm' fw={700}>
                                ${item.value.toLocaleString()}
                            </Text>
                        </Group>
                    ))}
                </Stack>
            </Stack>
        </Paper>
    );
}
