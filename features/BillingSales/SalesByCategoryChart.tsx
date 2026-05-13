'use client';

import { getTransactionChartDataAction } from '@/actions/transaction.action';
import { Paper, Text, Group, Stack, Badge } from '@mantine/core';
import { useEffect, useState } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from 'recharts';

interface ChartData {
    name: string;
    value: number;
    color: string;
}

export default function SalesByCategoryChart() {
    const [chartData, setChartData] = useState<ChartData[]>([]);

    useEffect(() => {
        async function getChartData() {
            try {
                const data = await getTransactionChartDataAction();

                if (data.data && data.success) {
                    setChartData(data.data);
                }
            } catch (error) {
                console.error('Failed to get Transaction Chart Data!');
            }
        }

        getChartData();
    }, []);

    return (
        <Paper withBorder radius='md' p='md' h='100%'>
            <Stack gap='xs'>
                <div style={{ height: 300, width: 300 }}>
                    <ResponsiveContainer width='100%' height='100%'>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx='50%'
                                cy='50%'
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey='value'
                            >
                                {chartData.map((entry, index) => (
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
                    {chartData.map((item) => (
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
