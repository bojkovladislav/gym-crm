'use client';

import { ActionIcon, Menu, rem, Text, Title } from '@mantine/core';
import { IconDotsVertical, IconTrash } from '@tabler/icons-react';
import { ReactNode, useEffect, useState } from 'react';
import ActionForm, {
    BaseFormConfig,
} from '../../components/ActionForm/ActionForm';
import { getUserRoleAction } from '@/actions/user.action';
import { UserRole } from '@/app/generated/prisma';
import { Modal } from '@/components/Modal';
import { Unauthorized } from '@/components/Unathorized';
import { handleResponse } from '@/lib/handle-response';

type SpecialActionType = 'edit' | 'delete';

interface BaseAction {
    label: string;
    icon: ReactNode;
    color?: string;
    permissions?: UserRole[];
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
    currentObject: T;
    inputs: BaseFormConfig[];
    actions: Action[];
    editObject?: (id: string, data: T) => void;
}

export default function ActionMenu<T extends { id: string; name: string }>({
    currentObject,
    actions,
    inputs,
    editObject,
}: Props<T>) {
    const [requestForDeletion, setRequestForDeletion] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<T | null>(null);
    const [actionPermissionLoading, setActionPermissionLoading] =
        useState(false);
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const deleteAction = actions.find(
        (action) =>
            action.name === 'delete' &&
            action.permissions?.includes(userRole as UserRole),
    );
    const checkInAction = actions.find(
        (action) => action.name === 'checkIn-simulation',
    );
    const actionsVisible = userRole
        ? actions.some((action) => {
              if (action.permissions) {
                  return action.permissions.includes(userRole);
              }

              return action;
          })
        : false;

    function onSubmit(data: T) {
        if (editObject) {
            editObject(currentObject.id, data);
        }
    }

    const defaultValues = inputs.reduce((acc, input) => {
        const key = input.name as keyof T;

        acc[input.name] = currentObject[key];

        return acc;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as any);

    useEffect(() => {
        async function getUserRole() {
            setActionPermissionLoading(true);

            const response = await getUserRoleAction();
            const [data, error] = response;

            if (error) {
                return <Unauthorized />;
            }

            handleResponse(response, {
                onSuccess: () => {
                    if (data !== null) {
                        setUserRole(data);
                    }
                },
                onError: (errorMessage) => {
                    console.error('Fetch user role rejected:', errorMessage);
                },
            });

            setActionPermissionLoading(false);
        }

        getUserRole();
    }, []);

    return (
        <>
            {!actionPermissionLoading && !actionsVisible && (
                <Text>No actions available</Text>
            )}

            {deleteAction && (
                <Modal
                    opened={requestForDeletion}
                    title='Delete Member'
                    onClose={() => setRequestForDeletion(false)}
                    confirmAction={() => deleteAction.action(currentObject.id)}
                >
                    <Title order={4} fw={500} mb='1rem'>
                        Are you sure you want to delete member{' '}
                        <Text span c='red' fw={700} inherit>
                            {`"${currentObject.name}"`}
                        </Text>
                        ?
                    </Title>
                </Modal>
            )}

            {selectedPerson && !actionPermissionLoading && (
                <ActionForm
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
                        .filter((action) => {
                            const baseCheck = action.name !== 'delete';

                            if (!action.permissions) {
                                return baseCheck;
                            }

                            return (
                                action.permissions.includes(
                                    userRole as UserRole,
                                ) && baseCheck
                            );
                        })
                        .map((action) => (
                            <Menu.Item
                                key={action.name}
                                onClick={() => {
                                    if (action.name === 'edit') {
                                        setSelectedPerson(currentObject);
                                    } else if (
                                        (action.name === 'checkIn-simulation' &&
                                            checkInAction) ||
                                        action.name === 'attendance'
                                    ) {
                                        action.action(currentObject.id);
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
