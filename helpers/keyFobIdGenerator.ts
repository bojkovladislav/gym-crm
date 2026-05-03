export function keyFobIdGenerator(name: string, dob: string): string {
    const nameParts = name.trim().split(/\s+/);
    const initials = nameParts
        .map((part) => part.charAt(0).toUpperCase())
        .join('')
        .slice(0, 3);

    const dateObj = new Date(dob);
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const dateString = `${month}${day}${year}`;

    const randomString = Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase();

    return `FOB-${initials}-${dateString}-${randomString}`;
}
