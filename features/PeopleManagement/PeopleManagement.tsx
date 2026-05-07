'use client';

import {
    Button,
    Card,
    Group,
    Loader,
    Stack,
    Table,
    Text,
    TextInput,
} from '@mantine/core';
import { IconSearch, IconUserPlus } from '@tabler/icons-react';
import { useState } from 'react';
import Person, { BasePerson } from './Person';
import PersonForm, { PersonFormConfig } from './PersonForm';
import { Action } from './PersonActionMenu';

interface Props<T extends BasePerson> {
    // Data & State
    loading: boolean;
    people: T[];

    // UI Strings & Config
    entityInPlural: string;
    entityInSingular: string;
    fieldsToShow: string[];
    formTitle: string;
    subTitle: string;
    tableHeaders: string[];

    // Complex Config
    personActions: Action[];
    personInputs: PersonFormConfig[];

    // Callbacks
    addNewPerson: (data: T) => void;
    editPerson?: (id: string, data: T) => void;
}

export default function PeopleManagement<T extends BasePerson>({
    entityInPlural,
    subTitle,
    addNewPerson,
    loading,
    personActions,
    entityInSingular,
    personInputs,
    fieldsToShow,
    editPerson,
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
                    inputs={personInputs}
                    onSubmit={addNewPerson}
                    title={formTitle}
                >
                    <Button
                        leftSection={<IconUserPlus size={16} />}
                        radius='md'
                    >
                        Add {entityInSingular}
                    </Button>
                </PersonForm>
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
                                    key={person.name}
                                    person={person}
                                    fieldsToShow={fieldsToShow}
                                    inputs={personInputs}
                                    personActions={personActions}
                                    editPerson={editPerson}
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
