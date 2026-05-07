'use client';

import { ActionIcon, Group, rem, Table } from '@mantine/core';
import { IconBarcode } from '@tabler/icons-react';
import PersonActionMenu, { Action } from './PersonActionMenu';
import { PersonFormConfig } from './PersonForm';

interface Props<T> {
    person: T;
    inputs: PersonFormConfig[];
    personActions: Action[];
    editOnSubmit?: () => void;
}

export default function Person<T extends { name: string; email: string }>({
    person,
    inputs,
    personActions,
    editOnSubmit,
}: Props<T>) {
    return (
        <Table.Tr>
            {(Object.keys(person) as Array<keyof T>).map((key) => (
                <Table.Td key={key as string}>{String(person[key])}</Table.Td>
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
                        editOnSubmit={editOnSubmit}
                    />
                </Group>
            </Table.Td>
        </Table.Tr>
    );
}
