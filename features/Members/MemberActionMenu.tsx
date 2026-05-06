'use client';

import { ActionIcon, Menu, rem, Text, Title } from '@mantine/core';
import {
    IconCalendarClock,
    IconCreditCard,
    IconDotsVertical,
    IconPencil,
    IconTrash,
} from '@tabler/icons-react';
import { MemberForm } from '../MemberForm';
import { Member } from './Members';
import { useState } from 'react';
import { removeMember } from '@/actions/member.action';
import { Modal } from '@/components/Modal/Modal';

interface Props {
    currentMember: Member;
    reloadMembers: () => Promise<void>;
}

export default function MemberActionMenu({
    currentMember,
    reloadMembers,
}: Props) {
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [requestForDeletion, setRequestForDeletion] = useState(false);

    const deleteMember = async () => {
        try {
            await removeMember(currentMember.id);
            await reloadMembers();
        } catch (error) {
            console.error('Failed to delete member!');
        }
    };

    const markForDeletion = () => {
        setRequestForDeletion(true);
    };

    return (
        <>
            <Modal
                opened={requestForDeletion}
                title='Delete Member'
                onClose={() => setRequestForDeletion(false)}
                confirmAction={deleteMember}
            >
                <Title order={4} fw={500} mb='1rem'>
                    Are you sure you want to delete member{' '}
                    <Text span c='red' fw={700} inherit>
                        {`"${currentMember.name}"`}
                    </Text>
                    ?
                </Title>
            </Modal>

            {selectedMember && (
                <MemberForm
                    purpose='edit'
                    defaultValues={selectedMember}
                    reloadMembers={reloadMembers}
                    onClose={() => setSelectedMember(null)}
                    isOpened
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

                    <Menu.Item
                        onClick={() => setSelectedMember(currentMember)}
                        leftSection={<IconPencil size={14} />}
                    >
                        Edit Profile
                    </Menu.Item>

                    <Menu.Item leftSection={<IconCreditCard size={14} />}>
                        Manage Billing
                    </Menu.Item>

                    <Menu.Item leftSection={<IconCalendarClock size={14} />}>
                        View Attendance
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Item
                        color='red'
                        leftSection={<IconTrash size={14} />}
                        onClick={markForDeletion}
                    >
                        Delete Member
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    );
}
