export type ActionResponse<T> = [T, null] | [null, string];

export async function createSafeAction<T>(
    actionFn: () => Promise<T>,
    fallbackMessage = 'An unexpected error occurred.',
): Promise<ActionResponse<T>> {
    try {
        const data = await actionFn();

        return [data, null];
    } catch (error) {
        console.error('Server Action Error:', error);
        const message =
            error instanceof Error ? error.message : fallbackMessage;

        return [null, message];
    }
}
