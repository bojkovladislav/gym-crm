import { Group, Paper, Text, ThemeIcon } from '@mantine/core';
import { StatisticBlockType } from './StatisticBlocks';

interface Props {
    block: StatisticBlockType;
}

export default function StatisticBlock({ block }: Props) {
    const Icon = block.icon;

    return (
        <Paper withBorder p='md' radius='md' key={block.title}>
            <Group justify='space-between'>
                <div>
                    <Text c='dimmed' tt='uppercase' fw={700} fz='xs'>
                        {block.title}
                    </Text>
                    <Text fw={700} fz='xl'>
                        {block.value.toLocaleString()}
                    </Text>
                </div>

                <ThemeIcon
                    color='gray'
                    variant='light'
                    style={{
                        color: `var(--mantine-color-${block.color}-filled)`,
                    }}
                    size='xl'
                    radius='md'
                >
                    <Icon size='1.8rem' stroke={1.5} />
                </ThemeIcon>
            </Group>
        </Paper>
    );
}
