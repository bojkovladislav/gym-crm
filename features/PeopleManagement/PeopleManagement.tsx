'use client';

import {
    Card,
    Group,
    Loader,
    Stack,
    Table,
    Text,
    TextInput,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import Person from './Person';
import PersonForm, { PersonFormConfig } from './PersonForm';
import { Action } from './PersonActionMenu';

interface Props<T extends { name: string; email: string }> {
    entityInPlural: string;
    newPersonFields: PersonFormConfig[];
    onNewPersonFormSubmit: () => void;
    formTitle: string;
    loading: boolean;
    tableHeaders: string[];
    subTitle: string;
    personActions: Action[];
    personInputs: PersonFormConfig[];
    editOnSubmit?: () => void;
    people: T[];
}

export default function PeopleManagement<
    T extends { name: string; email: string },
>({
    entityInPlural,
    subTitle,
    onNewPersonFormSubmit,
    newPersonFields,
    loading,
    personActions,
    personInputs,
    editOnSubmit,
    formTitle,
    tableHeaders,
    people,
}: Props<T>) {
    const [searchQuery, setQuery] = useState('');

    const filteredPeople = people.filter(
        (person) =>
            person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            person.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <Stack>
            <Group justify='space-between' mb='lg'>
                <div>
                    <Text size='xl' fw={700}>
                        {entityInPlural}
                    </Text>
                    <Text size='sm' c='dimmed'>
                        {subTitle}
                    </Text>
                </div>

                <PersonForm
                    inputs={newPersonFields}
                    onSubmit={onNewPersonFormSubmit}
                    title={formTitle}
                />
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
                            {tableHeaders.map((th) => (
                                <Table.Th key={th}>{th}</Table.Th>
                            ))}
                            <Table.Th style={{ textAlign: 'right' }}>
                                Actions
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {loading ? (
                            <Table.Tr>
                                <Table.Td
                                    colSpan={7}
                                    style={{ textAlign: 'center' }}
                                >
                                    <Loader size='sm' />
                                </Table.Td>
                            </Table.Tr>
                        ) : filteredPeople.length > 0 ? (
                            filteredPeople.map((person) => (
                                <Person
                                    person={person}
                                    key={person.name}
                                    inputs={personInputs}
                                    personActions={personActions}
                                    editOnSubmit={editOnSubmit}
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
                                    <Text c='dimmed'>
                                        No {entityInPlural} found
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        )}
                    </Table.Tbody>
                </Table>
            </Card>
        </Stack>
    );
}
