import { Paper, Text } from '@mantine/core';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export interface RevenueSource {
    name: string;
    value: string;
}

interface Props {
    data: RevenueSource[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RevenueDistribution({ data }: Props) {
    const COLORS = ['#228be6', '#40c057', '#fab005', '#7950f2'];

    return (
        <Paper withBorder p='md' radius='md' h={400}>
            <Text fw={500} mb='lg'>
                Revenue Sources
            </Text>
            <ResponsiveContainer width='100%' height='90%'>
                <PieChart>
                    <Pie
                        data={data}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey='value'
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </Paper>
    );
}
