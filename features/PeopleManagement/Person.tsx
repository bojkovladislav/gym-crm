'use client';

import { ActionIcon, Group, rem, Table } from '@mantine/core';
import { IconBarcode } from '@tabler/icons-react';
import PersonActionMenu, { Action } from './PersonActionMenu';
import { PersonFormConfig } from './PersonForm';

export interface BasePerson {
    name: string;
    email: string;
    id: string;
}

interface Props<T> {
    person: T;
    inputs: PersonFormConfig[];
    fieldsToShow: string[];
    personActions: Action[];
    editPerson?: (id: string, data: T) => void;
}

export default function Person<T extends BasePerson>({
    person,
    inputs,
    fieldsToShow,
    personActions,
    editPerson,
}: Props<T>) {
    return (
        <Table.Tr>
            {fieldsToShow.map((field) => (
                <Table.Td key={field as string}>
                    {String(person[field as keyof T] ?? '')}
                </Table.Td>
            ))}

            <Table.Td>
                <Group gap='xs' justify='flex-end'>
                    <ActionIcon variant='subtle' color='gray'>
                        <IconBarcode
                            style={{
                                width: rem(16),
                                height: rem(16),
                            }}
                        />
                    </ActionIcon>

                    <PersonActionMenu
                        currentPerson={person}
                        inputs={inputs}
                        actions={personActions}
                        editPerson={editPerson}
                    />
                </Group>
            </Table.Td>
        </Table.Tr>
    );
}
