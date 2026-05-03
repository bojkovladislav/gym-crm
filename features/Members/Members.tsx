'use client';

import {
    ActionIcon,
    Badge,
    Button,
    Card,
    Group,
    Menu,
    rem,
    Stack,
    Table,
    Text,
    TextInput,
    Loader,
} from '@mantine/core';
import {
    IconBarcode,
    IconCalendarClock,
    IconCreditCard,
    IconDotsVertical,
    IconPencil,
    IconSearch,
    IconTrash,
    IconUserPlus,
} from '@tabler/icons-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AddMemberForm } from '../AddMemberForm';

export interface Member {
    id: string;
    keyFobId: string;
    dob: string;
    name: string;
    email: string;
    planId: string;
    status: string;
    visits: number;
    joinedAt: string;
}

export interface Plan {
    id: string;
    name: string;
    price: number;
    currency: string;
}

export default function Members() {
    const [searchQuery, setQuery] = useState('');
    const [members, setMembers] = useState<Member[]>([]);
    const [plans, setPlans] = useState<Record<string, string>>({});
    const [loadingPlans, setLoadingPlans] = useState(false);

    useEffect(() => {
        async function fetchInitialData() {
            try {
                setLoadingPlans(true);
                const memberResponse = await axios.get('/api/members');
                setMembers(memberResponse.data);

                const planResponse = await axios.get('/api/plans');
                const planMap = planResponse.data.reduce(
                    (acc: Record<string, string>, plan: Plan) => {
                        acc[plan.id] = plan.name;
                        return acc;
                    },
                    {},
                );

                setPlans(planMap);
            } catch (error) {
                console.error('Error fetching initial data!', error);
            } finally {
                setLoadingPlans(false);
            }
        }

        fetchInitialData();
    }, []);

    const filteredMembers = members.filter(
        (member) =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <Stack>
            <Group justify='space-between' mb='lg'>
                <div>
                    <Text size='xl' fw={700}>
                        Members
                    </Text>
                    <Text size='sm' c='dimmed'>
                        Manage and track active gym members
                    </Text>
                </div>

                <AddMemberForm>
                    <Button
                        leftSection={<IconUserPlus size={16} />}
                        radius='md'
                    >
                        Add Member
                    </Button>
                </AddMemberForm>
            </Group>

            <Card shadow='sm' radius='md' padding='lg'>
                <TextInput
                    placeholder='Search by name or email...'
                    leftSection={<IconSearch size={16} />}
                    value={searchQuery}
                    onChange={(e) => setQuery(e.target.value)}
                    mb='lg'
                    style={{ maxWidth: 400 }}
                />

                <Table striped highlightOnHover verticalSpacing='sm'>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Plan</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Visits</Table.Th>
                            <Table.Th>Joined</Table.Th>
                            <Table.Th style={{ textAlign: 'right' }}>
                                Actions
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {loadingPlans ? (
                            <Table.Tr>
                                <Table.Td
                                    colSpan={7}
                                    style={{ textAlign: 'center' }}
                                >
                                    <Loader size='sm' />
                                </Table.Td>
                            </Table.Tr>
                        ) : filteredMembers.length > 0 ? (
                            filteredMembers.map((member) => (
                                <Table.Tr key={member.id}>
                                    <Table.Td>
                                        <Text fw={500}>{member.name}</Text>
                                    </Table.Td>
                                    <Table.Td>{member.email}</Table.Td>
                                    <Table.Td>
                                        {plans[member.planId] || 'Loading...'}
                                    </Table.Td>
                                    <Table.Td>
                                        <Badge
                                            color={
                                                member.status === 'ACTIVE'
                                                    ? 'green'
                                                    : 'red'
                                            }
                                            variant='light'
                                        >
                                            {member.status}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td>
                                        {member.visits} this month
                                    </Table.Td>
                                    <Table.Td>
                                        {new Date(
                                            member.joinedAt,
                                        ).toLocaleDateString()}
                                    </Table.Td>
                                    <Table.Td>
                                        <Group gap='xs' justify='flex-end'>
                                            <ActionIcon
                                                variant='subtle'
                                                color='gray'
                                            >
                                                <IconBarcode
                                                    style={{
                                                        width: rem(16),
                                                        height: rem(16),
                                                    }}
                                                />
                                            </ActionIcon>

                                            <Menu shadow='md' width={200}>
                                                <Menu.Target>
                                                    <ActionIcon
                                                        variant='subtle'
                                                        color='gray'
                                                    >
                                                        <IconDotsVertical
                                                            style={{
                                                                width: rem(16),
                                                                height: rem(16),
                                                            }}
                                                        />
                                                    </ActionIcon>
                                                </Menu.Target>

                                                <Menu.Dropdown>
                                                    <Menu.Label>
                                                        Application
                                                    </Menu.Label>
                                                    <Menu.Item
                                                        leftSection={
                                                            <IconPencil
                                                                size={14}
                                                            />
                                                        }
                                                    >
                                                        Edit Profile
                                                    </Menu.Item>
                                                    <Menu.Item
                                                        leftSection={
                                                            <IconCreditCard
                                                                size={14}
                                                            />
                                                        }
                                                    >
                                                        Manage Billing
                                                    </Menu.Item>
                                                    <Menu.Item
                                                        leftSection={
                                                            <IconCalendarClock
                                                                size={14}
                                                            />
                                                        }
                                                    >
                                                        View Attendance
                                                    </Menu.Item>
                                                    <Menu.Divider />
                                                    <Menu.Item
                                                        color='red'
                                                        leftSection={
                                                            <IconTrash
                                                                size={14}
                                                            />
                                                        }
                                                    >
                                                        Delete Member
                                                    </Menu.Item>
                                                </Menu.Dropdown>
                                            </Menu>
                                        </Group>
                                    </Table.Td>
                                </Table.Tr>
                            ))
                        ) : (
                            <Table.Tr>
                                <Table.Td
                                    colSpan={7}
                                    style={{
                                        textAlign: 'center',
                                        padding: '2rem 0',
                                    }}
                                >
                                    <Text c='dimmed'>No members found</Text>
                                </Table.Td>
                            </Table.Tr>
                        )}
                    </Table.Tbody>
                </Table>
            </Card>
        </Stack>
    );
}
