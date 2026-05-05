'use client';

import {
    Box,
    Button,
    Drawer,
    Group,
    rem,
    Select,
    Stack,
    TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import {
    IconCalendar,
    IconDeviceFloppy,
    IconMail,
    IconUser,
    IconX,
} from '@tabler/icons-react';
import { ReactNode, useEffect, useState } from 'react';
import { Member } from '../Members/Members';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { keyFobIdGenerator } from '@/helpers/keyFobIdGenerator';
import { updateMember } from '@/actions/member.action';

type Inputs = Omit<Member, 'visits' | 'joinedAt' | 'keyFobId' | 'status'>;

interface Props {
    children?: ReactNode;
    purpose: 'create' | 'edit';
    defaultValues?: Inputs;
    reloadMembers?: () => Promise<void>;
    isOpened?: boolean;
    onClose?: () => void;
}

interface Plan {
    id: string;
    name: string;
    price: number;
}

interface SelectOption {
    value: string;
    label: string;
}

export default function MemberForm({
    children,
    purpose,
    defaultValues,
    isOpened = false,
    reloadMembers,
    onClose,
}: Props) {
    const [opened, { open, close }] = useDisclosure(isOpened);
    const [plans, setPlans] = useState<SelectOption[]>([]);
    const {
        control,
        reset,
        watch,
        handleSubmit,
        formState: { errors, isLoading },
    } = useForm<Inputs>({
        defaultValues: defaultValues || {
            name: '',
            email: '',
            planId: '',
            dob: '',
        },
    });

    const id = watch('id');

    const getPlans = async () => {
        try {
            const response = await axios.get('/api/plans');
            const plans: Plan[] = response.data;

            const modifiedPlans = plans.map((plan) => ({
                value: plan.id,
                label: `${plan.name} (${plan.price.toFixed(2)})`,
            }));

            setPlans(modifiedPlans);
        } catch (error) {
            console.error('Failed to fetch plans ', error);
        }
    };

    const handleCancel = () => {
        reset();
        close();
    };

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            if (purpose === 'create') {
                const newMember = {
                    ...data,
                    dob: new Date(data.dob),
                    keyFobId: keyFobIdGenerator(data.name, data.dob),
                };

                // subscription payment

                await axios.post('/api/members', newMember);
            } else if (purpose === 'edit') {
                const updatedMember = {
                    ...data,
                    dob: new Date(data.dob),
                };

                await updateMember(id, updatedMember);
            }

            reset();
            if (reloadMembers) {
                await reloadMembers();
            }
            close();
        } catch (error) {
            console.error(
                `Failed to ${purpose === 'create' ? 'add' : 'edit'} Member `,
                error,
            );
        }
    };

    useEffect(() => {
        if (!opened && onClose) {
            onClose();
        }
    }, [opened]);

    return (
        <>
            <Drawer
                opened={opened}
                onClose={close}
                title={
                    purpose === 'create'
                        ? 'Add new member'
                        : `Edit member ${defaultValues?.name}`
                }
                position='right'
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack gap='md'>
                        <Controller
                            name='name'
                            control={control}
                            rules={{ required: 'Full name is required' }}
                            render={({ field }) => (
                                <TextInput
                                    withAsterisk
                                    label='Full Name'
                                    placeholder='John Doe'
                                    leftSection={
                                        <IconUser
                                            style={{
                                                width: rem(16),
                                                height: rem(16),
                                            }}
                                        />
                                    }
                                    error={errors.name?.message}
                                    {...field}
                                />
                            )}
                        />

                        <Controller
                            name='dob'
                            control={control}
                            rules={{ required: 'Date of birth is required' }}
                            render={({
                                field: { value, onChange, ...field },
                            }) => (
                                <DateInput
                                    withAsterisk
                                    label='Date of Birth'
                                    placeholder='Pick a date'
                                    leftSection={
                                        <IconCalendar
                                            style={{
                                                width: rem(16),
                                                height: rem(16),
                                            }}
                                        />
                                    }
                                    value={value}
                                    onChange={onChange}
                                    error={errors.dob?.message}
                                    {...field}
                                />
                            )}
                        />

                        <Controller
                            name='email'
                            control={control}
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email address',
                                },
                            }}
                            render={({ field }) => (
                                <TextInput
                                    withAsterisk
                                    label='Email Address'
                                    placeholder='john.doe@example.com'
                                    leftSection={
                                        <IconMail
                                            style={{
                                                width: rem(16),
                                                height: rem(16),
                                            }}
                                        />
                                    }
                                    error={errors.email?.message}
                                    {...field}
                                />
                            )}
                        />

                        <Controller
                            name='planId'
                            control={control}
                            rules={{ required: 'Please select a plan' }}
                            render={({ field }) => (
                                <Select
                                    onDropdownOpen={getPlans}
                                    withAsterisk
                                    label='Membership Plan'
                                    placeholder='Select a plan'
                                    data={plans}
                                    error={errors.planId?.message}
                                    {...field}
                                />
                            )}
                        />

                        <Group justify='flex-end' mt='md'>
                            <Button
                                variant='outline'
                                color='gray'
                                leftSection={<IconX size={16} />}
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                type='submit'
                                color='blue'
                                leftSection={<IconDeviceFloppy size={16} />}
                            >
                                Save Member
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </Drawer>

            <Box onClick={open}>{children}</Box>
        </>
    );
}
