export const mergeDateAndTime = (date: Date, timeString: string): Date => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const newDate = new Date(date);

    newDate.setHours(hours, minutes, 0, 0);

    return newDate;
};
