import { Paper, Text } from '@mantine/core';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { AdminStats } from './AdminDashboard';

interface Props {
    stats: AdminStats;
    fillColor: string;
}

export default function OperationalActivityChart({ stats, fillColor }: Props) {
    return (
        <Paper withBorder p='md' radius='md' h={400}>
            <Text fw={500} mb='xl'>
                Operational Volume
            </Text>
            <ResponsiveContainer width='100%' height='80%'>
                <BarChart
                    data={[
                        {
                            name: 'Sessions',
                            count: stats.appointmentsToday,
                        },
                        {
                            name: 'Maint. Tasks',
                            count: stats.pendingMaintenance,
                        },
                    ]}
                >
                    <CartesianGrid strokeDasharray='3 3' vertical={false} />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Bar
                        dataKey='count'
                        fill={fillColor}
                        radius={[4, 4, 0, 0]}
                        barSize={60}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
}
