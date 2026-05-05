'use client';

import {
    Button,
    Card,
    Group,
    Stack,
    Table,
    Text,
    TextInput,
    Loader,
} from '@mantine/core';
import { IconSearch, IconUserPlus } from '@tabler/icons-react';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import Member from './Member';
import { MemberForm } from '../MemberForm';

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
}

export default function Members() {
    const [searchQuery, setQuery] = useState('');
    const [members, setMembers] = useState<Member[]>([]);
    const [plans, setPlans] = useState<Record<string, string>>({});
    const [loadingPlans, setLoadingPlans] = useState(false);

    const fetchInitialData = async () => {
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
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
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

                <MemberForm purpose='create' reloadMembers={fetchInitialData}>
                    <Button
                        leftSection={<IconUserPlus size={16} />}
                        radius='md'
                    >
                        Add Member
                    </Button>
                </MemberForm>
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
                                <Member
                                    key={member.id}
                                    member={member}
                                    plans={plans}
                                    reloadMembers={fetchInitialData}
                                />
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
