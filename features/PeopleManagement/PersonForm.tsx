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
import { DateInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { ReactNode, useEffect } from 'react';
import {
    Controller,
    DefaultValues,
    FieldValues,
    SubmitHandler,
    useForm,
} from 'react-hook-form';

export type InputType = 'text' | 'select' | 'checkbox' | 'date';

export interface PersonFormConfig {
    name: string;
    label: string;
    inputType: InputType;
    placeholder?: string;
    icon?: ReactNode;
    rules?: object;
    data?: { value: string; label: string }[];
    onDropdownOpen?: () => void;
}

interface Props<T extends FieldValues> {
    inputs: PersonFormConfig[];
    onSubmit: SubmitHandler<T>;
    title: string;
    defaultValues?: T;
    children?: ReactNode;
    isOpened?: boolean;
    onClose?: () => void;
}

export default function PersonForm<T extends FieldValues>({
    inputs,
    children,
    onSubmit,
    title,
    defaultValues,
    isOpened,
    onClose,
}: Props<T>) {
    const [opened, { open, close }] = useDisclosure(isOpened);

    const initialValues = inputs.reduce((acc, input) => {
        acc[input.name] = '';
        return acc;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as any) as T;

    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<T>({
        defaultValues: (defaultValues || initialValues) as DefaultValues<T>,
    });

    const clearForm = () => {
        reset();
        close();
    };

    const submit: SubmitHandler<T> = (data) => {
        onSubmit(data);

        clearForm();
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
                <form onSubmit={handleSubmit(submit)}>
                    <Stack gap='md'>
                        {inputs.map((input) => (
                            <Controller
                                key={input.name}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                name={input.name as any}
                                control={control}
                                rules={input.rules}
                                render={({ field }) => {
                                    const commonProps = {
                                        ...field,
                                        label: input.label,
                                        placeholder: input.placeholder,
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        error: (errors as any)[input.name]
                                            ?.message,
                                        withAsterisk: !!input.rules,
                                        leftSection: input.icon,
                                    };

                                    switch (input.inputType) {
                                        case 'date':
                                            return (
                                                <DateInput
                                                    {...commonProps}
                                                    {...field}
                                                    value={
                                                        field.value &&
                                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                        (field.value as any) instanceof
                                                            Date
                                                            ? (field.value as unknown as Date)
                                                            : field.value
                                                              ? new Date(
                                                                    field.value,
                                                                )
                                                              : null
                                                    }
                                                    onChange={(val) =>
                                                        field.onChange(val)
                                                    }
                                                />
                                            );
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
                                                <TextInput {...commonProps} />
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
                                onClick={clearForm}
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
