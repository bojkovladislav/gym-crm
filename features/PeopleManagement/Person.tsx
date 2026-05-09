'use client';

import { Group, Table } from '@mantine/core';
import PersonActionMenu, { Action } from './PersonActionMenu';
import { BaseFormConfig } from '../../components/ActionForm/ActionForm';

export interface BasePerson {
    name: string;
    email: string;
    id: string;
}

interface Props<T> {
    person: T;
    inputs: BaseFormConfig[];
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
                <Group justify='flex-end'>
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
