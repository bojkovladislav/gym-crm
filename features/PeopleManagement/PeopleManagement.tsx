'use client';

import { Card, Loader, Stack, Table, Text, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import Person, { BasePerson } from './Person';
import { BaseFormConfig } from '@/components/ActionForm/ActionForm';
import { PageHeader } from '@/components/PageHeader';
import { Action } from '../ActionMenu/ActionMenu';

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
    personInputs: BaseFormConfig[];
    personEditInputs?: BaseFormConfig[];

    // Callbacks
    addNewPerson?: (data: T) => void;
    editPerson?: (id: string, data: T) => void;
}

export default function PeopleManagement<T extends BasePerson>({
    entityInPlural,
    subTitle,
    addNewPerson,
    loading,
    personEditInputs,
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
            <PageHeader
                entityInPlural={entityInPlural}
                entityInSingular={entityInSingular}
                subTitle={subTitle}
                formTitle={formTitle}
                inputs={personInputs}
                onSubmit={addNewPerson}
            />

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
                                    inputs={
                                        personEditInputs
                                            ? personEditInputs
                                            : personInputs
                                    }
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
