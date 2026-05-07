export const formatDateString = (
    dateValue: string | Date | number | null | undefined,
    fallback: string = 'N/A',
): string => {
    if (!dateValue) return fallback;

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) {
        return fallback;
    }

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};
