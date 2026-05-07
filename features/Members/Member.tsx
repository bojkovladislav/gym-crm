import { ActionIcon, Badge, Group, rem, Table, Text } from '@mantine/core';
import { IconBarcode } from '@tabler/icons-react';
import { Member as MemberType } from './Members';
import MemberActionMenu from './MemberActionMenu';

interface Props {
    member: MemberType;
    plans: Record<string, string>;
    reloadMembers: () => Promise<void>;
}

export default function Member({ member, plans, reloadMembers }: Props) {
    return (
        <Table.Tr>
            <Table.Td>
                <Text fw={500}>{member.name}</Text>
            </Table.Td>
            <Table.Td>{member.email}</Table.Td>
            <Table.Td>{plans[member.planId] || 'Loading...'}</Table.Td>
            <Table.Td>
                <Badge
                    color={member.status === 'ACTIVE' ? 'green' : 'red'}
                    variant='light'
                >
                    {member.status}
                </Badge>
            </Table.Td>
            <Table.Td>{member.visits} this month</Table.Td>
            <Table.Td>
                {new Date(member.joinedAt).toLocaleDateString()}
            </Table.Td>
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

                    <MemberActionMenu
                        currentMember={member}
                        reloadMembers={reloadMembers}
                    />
                </Group>
            </Table.Td>
        </Table.Tr>
    );
}
