import { Button, Group, Text } from '@mantine/core';
import { ActionForm } from '../ActionForm';
import { BaseFormConfig } from '../ActionForm/ActionForm';
import { IconUserPlus } from '@tabler/icons-react';

interface Props {
    entityInPlural: string;
    entityInSingular?: string;
    subTitle: string;
    formTitle?: string;
    inputs?: BaseFormConfig[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit?: (data: any) => void;
}

export default function PageHeader({
    entityInPlural,
    entityInSingular,
    subTitle,
    onSubmit,
    formTitle,
    inputs,
}: Props) {
    return (
        <Group justify='space-between' mb='lg'>
            <div>
                <Text size='xl' fw={700}>
                    {entityInPlural}
                </Text>
                <Text size='sm' c='dimmed'>
                    {subTitle}
                </Text>
            </div>

            {onSubmit && formTitle && inputs && (
                <ActionForm
                    inputs={inputs}
                    onSubmit={onSubmit}
                    title={formTitle}
                >
                    <Button
                        leftSection={<IconUserPlus size={16} />}
                        radius='md'
                    >
                        Add {entityInSingular}
                    </Button>
                </ActionForm>
            )}
        </Group>
    );
}
