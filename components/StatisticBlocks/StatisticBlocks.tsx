import { SimpleGrid } from '@mantine/core';
import { ElementType } from 'react';
import StatisticBlock from './StatisticBlock';

export interface StatisticBlockType {
    title: string;
    value: number | string;
    icon: ElementType;
    color: string;
}

interface Props {
    blocks: StatisticBlockType[];
}

export default function StatisticBlocks({ blocks }: Props) {
    return (
        <SimpleGrid cols={{ base: 1, xs: 2, md: 5 }} mb='xl'>
            {blocks.map((block) => (
                <StatisticBlock block={block} key={block.title} />
            ))}
        </SimpleGrid>
    );
}
