'use client';

import { Paper, Text, useMantineTheme } from '@mantine/core';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

export interface ChartData {
    month: string;
    income: number;
    expense: number;
}

interface Props {
    data: ChartData[];
}

export function FinancialTrendChart({ data }: Props) {
    const theme = useMantineTheme();

    return (
        <Paper withBorder p='md' radius='md' h={400}>
            <Text fw={500} mb='lg'>
                Financial Performance (Monthly)
            </Text>
            <ResponsiveContainer width='100%' height='90%'>
                <BarChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid
                        strokeDasharray='3 3'
                        vertical={false}
                        stroke='#eee'
                    />
                    <XAxis dataKey='month' axisLine={false} tickLine={false} />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(val) => `$${val}`}
                    />
                    <Tooltip
                        cursor={{ fill: '#f8f9fa' }}
                        contentStyle={{
                            borderRadius: '8px',
                            border: '1px solid #eee',
                        }}
                    />
                    <Legend iconType='circle' />
                    <Bar
                        name='Income'
                        dataKey='income'
                        fill={theme.colors.blue[6]}
                        radius={[4, 4, 0, 0]}
                    />
                    <Bar
                        name='Expenses'
                        dataKey='expense'
                        fill={theme.colors.red[6]}
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
}
