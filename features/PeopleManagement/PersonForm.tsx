'use client';

import {
    Box,
    Button,
    Drawer,
    Group,
    Select,
    Stack,
    TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { ReactNode, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

type InputType = 'text' | 'select' | 'checkbox';

export interface PersonFormConfig {
    name: string;
    label: string;
    placeholder?: string;
    inputType: InputType;
    icon?: ReactNode;
    rules?: object;
    data?: { value: string; label: string }[];
    onDropdownOpen?: () => void;
}

interface Props {
    inputs: PersonFormConfig[];
    onSubmit: () => void;
    title: string;
    children?: ReactNode;
    isOpened?: boolean;
    onClose?: () => void;
}

export default function PersonForm({
    inputs,
    children,
    onSubmit,
    title,
    isOpened,
    onClose,
}: Props) {
    const [opened, { open, close }] = useDisclosure(isOpened);
    const values = inputs.map((input) => input.name);

    const {
        control,
        reset,
        handleSubmit,
        formState: { errors, isLoading },
    } = useForm({
        defaultValues: values,
    });

    const handleCancel = () => {
        reset();
        close();
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
                title={title}
                position='right'
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack gap='md'>
                        {inputs.map((input) => (
                            <Controller
                                key={input.name}
                                name={input.name}
                                control={control}
                                rules={input.rules}
                                render={({ field }) => {
                                    const commonProps = {
                                        ...field,
                                        label: input.label,
                                        placeholder: input.placeholder,
                                        error: errors[input.name]?.message,
                                        withAsterisk: !!input.rules,
                                    };

                                    switch (input.inputType) {
                                        case 'select':
                                            return (
                                                <Select
                                                    {...commonProps}
                                                    data={input.data || []}
                                                    onDropdownOpen={
                                                        input.onDropdownOpen
                                                    }
                                                />
                                            );
                                        case 'text':
                                        default:
                                            return (
                                                <TextInput
                                                    {...commonProps}
                                                    leftSection={input.icon}
                                                />
                                            );
                                    }
                                }}
                            />
                        ))}

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
