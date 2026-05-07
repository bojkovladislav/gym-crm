'use client';

import { Modal } from '@/components/Modal/Modal';
import { ActionIcon, Menu, rem, Text, Title } from '@mantine/core';
import { IconDotsVertical, IconTrash } from '@tabler/icons-react';
import { ReactNode, useState } from 'react';
import PersonForm, { PersonFormConfig } from './PersonForm';
import { BasePerson } from './Person';

type SpecialActionType = 'edit' | 'delete';

interface BaseAction {
    label: string;
    icon: ReactNode;
    color?: string;
}

interface GeneralAction extends BaseAction {
    name: Exclude<SpecialActionType, 'delete'> | (string & {});
    action: () => void;
}

interface DeleteAction extends BaseAction {
    name: 'delete';
    action: (id: string | number) => Promise<void>;
}

export type Action = GeneralAction | DeleteAction;

interface Props<T> {
    currentPerson: T;
    inputs: PersonFormConfig[];
    actions: Action[];
    editPerson?: (id: string, data: T) => void;
}

export default function PersonActionMenu<T extends BasePerson>({
    currentPerson,
    actions,
    inputs,
    editPerson: editOnSubmit,
}: Props<T>) {
    const [requestForDeletion, setRequestForDeletion] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<T | null>(null);
    const deleteAction = actions.find((action) => action.name === 'delete');

    function onSubmit(data: T) {
        if (editOnSubmit) {
            editOnSubmit(currentPerson.id, data);
        }
    }

    const defaultValues = inputs.reduce((acc, input) => {
        const key = input.name as keyof T;

        acc[input.name] = currentPerson[key];

        return acc;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as any);

    return (
        <>
            {deleteAction && (
                <Modal
                    opened={requestForDeletion}
                    title='Delete Member'
                    onClose={() => setRequestForDeletion(false)}
                    confirmAction={() => deleteAction.action(currentPerson.id)}
                >
                    <Title order={4} fw={500} mb='1rem'>
                        Are you sure you want to delete member{' '}
                        <Text span c='red' fw={700} inherit>
                            {`"${currentPerson.name}"`}
                        </Text>
                        ?
                    </Title>
                </Modal>
            )}

            {selectedPerson && (
                <PersonForm
                    inputs={inputs}
                    title='Edit Person'
                    defaultValues={defaultValues}
                    onSubmit={onSubmit}
                    onClose={() => setSelectedPerson(null)}
                    isOpened={!!selectedPerson}
                />
            )}

            <Menu shadow='md' width={200}>
                <Menu.Target>
                    <ActionIcon variant='subtle' color='gray'>
                        <IconDotsVertical
                            style={{
                                width: rem(16),
                                height: rem(16),
                            }}
                        />
                    </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>Application</Menu.Label>

                    {actions
                        .filter((action) => action.name !== 'delete')
                        .map((action) => (
                            <Menu.Item
                                key={action.name}
                                onClick={() => {
                                    if (action.name === 'edit') {
                                        setSelectedPerson(currentPerson);
                                    } else {
                                        (action.action as () => void)();
                                    }
                                }}
                            >
                                {action.label}
                            </Menu.Item>
                        ))}

                    {deleteAction && (
                        <>
                            <Menu.Divider />

                            <Menu.Item
                                color='red'
                                leftSection={<IconTrash size={14} />}
                                onClick={() => setRequestForDeletion(true)}
                            >
                                {deleteAction.label}
                            </Menu.Item>
                        </>
                    )}
                </Menu.Dropdown>
            </Menu>
        </>
    );
}
