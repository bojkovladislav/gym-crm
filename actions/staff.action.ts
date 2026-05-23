'use server';

import { StaffMember } from '@/features/Staff/Staff';
import { createSafeAction } from '@/helpers/createSafeAction';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function createStaffMember(data: StaffMember) {
    return createSafeAction(async () => {
        const { email, password, name, role, baseSalary } = data;

        const user = await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
            },
        });

        if (!user) throw new Error('Failed to create new member.');

        await prisma.user.update({
            where: { email: email },
            data: { role, baseSalary },
        });

        return user;
    }, 'Could not create new staff member.');
}
