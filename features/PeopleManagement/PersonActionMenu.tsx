'use client';

import { Modal } from '@/components/Modal/Modal';
import { ActionIcon, Menu, rem, Text, Title } from '@mantine/core';
import { IconDotsVertical, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import PersonForm, { PersonFormConfig } from './PersonForm';

type SpecialActionType = 'edit' | 'delete';

export interface Action {
    name: SpecialActionType | (string & {});
    action: () => void;
}

interface Props<T> {
    currentPerson: T;
    inputs: PersonFormConfig[];
    actions: Action[];
    editOnSubmit?: () => void;
}

export default function PersonActionMenu<
    T extends { name: string; email: string },
>({ currentPerson, actions, inputs, editOnSubmit }: Props<T>) {
    const [requestForDeletion, setRequestForDeletion] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<T | null>(null);
    const deleteAction = actions.find((action) => action.name === 'delete');

    function onSubmit() {
        if (editOnSubmit) {
            editOnSubmit();
        }
    }

    return (
        <>
            {deleteAction && (
                <Modal
                    opened={requestForDeletion}
                    title='Delete Member'
                    onClose={() => setRequestForDeletion(false)}
                    confirmAction={deleteAction.action}
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
                    onSubmit={onSubmit}
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
                                onClick={
                                    action.name === 'edit'
                                        ? () => setSelectedPerson(currentPerson)
                                        : action.action
                                }
                            >
                                {action.name}
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
                                Delete Member
                            </Menu.Item>
                        </>
                    )}
                </Menu.Dropdown>
            </Menu>
        </>
    );
}
