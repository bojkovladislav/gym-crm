'use client';

import { useDisclosure } from '@mantine/hooks';
import {
    Modal,
    Button,
    TextInput,
    Select,
    Group,
    Stack,
    ActionIcon,
    Tooltip,
    Text,
} from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import { IconCalendarPlus, IconClock, IconTag } from '@tabler/icons-react';
import { useForm, Controller } from 'react-hook-form';
import { createAppointmentEventAction } from '@/actions/event.action';

export interface AppointmentFormValues {
    title: string;
    date: Date | null;
    startTime: string;
    duration: string;
    notes: string;
}

interface Props {
    clientName: string;
    trainerId: string;
}

export function CreateAppointmentModal({ trainerId, clientName }: Props) {
    const [opened, { open, close }] = useDisclosure(false);

    const { control, handleSubmit, reset } = useForm<AppointmentFormValues>({
        defaultValues: {
            title: '',
            date: new Date(),
            startTime: '',
            duration: '60 min',
            notes: '',
        },
    });

    const onSubmit = async (data: AppointmentFormValues) => {
        try {
            await createAppointmentEventAction(trainerId, clientName, data);

            close();
            reset();
        } catch (error) {
            throw new Error(
                'Something went wrong during appointment creation.',
            );
        }
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title={<Text fw={700}>Schedule Training: {clientName}</Text>}
                centered
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack gap='md'>
                        {/* New Title Input */}
                        <Controller
                            name='title'
                            control={control}
                            rules={{ required: 'Event title is required' }}
                            render={({ field, fieldState }) => (
                                <TextInput
                                    {...field}
                                    label='Event Title'
                                    placeholder='e.g., Personal Training - Strength'
                                    leftSection={<IconTag size={16} />}
                                    required
                                    error={fieldState.error?.message}
                                />
                            )}
                        />

                        <Controller
                            name='date'
                            control={control}
                            rules={{ required: 'Date is required' }}
                            render={({ field, fieldState }) => (
                                <DateInput
                                    {...field}
                                    label='Date of Session'
                                    placeholder='Pick date'
                                    required
                                    minDate={new Date()}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />

                        <Group grow>
                            <Controller
                                name='startTime'
                                control={control}
                                rules={{ required: 'Start time is required' }}
                                render={({ field, fieldState }) => (
                                    <TimeInput
                                        {...field}
                                        label='Start Time'
                                        leftSection={<IconClock size={16} />}
                                        required
                                        error={fieldState.error?.message}
                                    />
                                )}
                            />

                            <Controller
                                name='duration'
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label='Duration'
                                        placeholder='Pick duration'
                                        data={['30 min', '60 min', '90 min']}
                                    />
                                )}
                            />
                        </Group>

                        <Controller
                            name='notes'
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label='Focus Area/Notes'
                                    placeholder='e.g., Leg day, focusing on squat form'
                                />
                            )}
                        />

                        <Group justify='flex-end' mt='md'>
                            <Button
                                variant='subtle'
                                onClick={close}
                                color='gray'
                            >
                                Cancel
                            </Button>
                            <Button type='submit'>Confirm Session</Button>
                        </Group>
                    </Stack>
                </form>
            </Modal>

            <Tooltip label='Schedule Session'>
                <ActionIcon variant='subtle' color='blue' onClick={open}>
                    <IconCalendarPlus size={16} />
                </ActionIcon>
            </Tooltip>
        </>
    );
}
