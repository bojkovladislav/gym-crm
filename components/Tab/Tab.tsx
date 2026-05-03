import { useState } from 'react';
import { Group, Text, ThemeIcon } from '@mantine/core';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
    href: string;
    title: string;
    icon: ReactNode;
}

export default function Tab({ href, title, icon }: Props) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            href={href}
            key={title}
            style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
            }}
        >
            <Group
                gap='lg'
                p='sm'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: isHovered ? '#f1f3f5' : 'transparent',
                    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.2s ease-in-out',
                }}
            >
                <ThemeIcon size={50} radius='xl' color='blue' variant='light'>
                    {icon}
                </ThemeIcon>

                <Text fw={500}>{title}</Text>
            </Group>
        </Link>
    );
}
