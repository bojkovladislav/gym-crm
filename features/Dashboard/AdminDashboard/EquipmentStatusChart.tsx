import { Paper, Text } from '@mantine/core';
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';

interface Props {
    equipmentData: { name: string; value: number; color: string }[];
}

export default function EquipmentStatusChart({ equipmentData }: Props) {
    return (
        <Paper withBorder p='md' radius='md' h={400}>
            <Text fw={500} mb='xl'>
                Facility Health Status
            </Text>
            <ResponsiveContainer width='100%' height='80%'>
                <PieChart>
                    <Pie
                        data={equipmentData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey='value'
                    >
                        {equipmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign='bottom' height={36} />
                </PieChart>
            </ResponsiveContainer>
        </Paper>
    );
}
