'use server';

import { StaffMember } from '@/features/Staff/Staff';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function createStaffMember(data: StaffMember) {
    try {
        const { email, password, name, role, baseSalary } = data;

        const user = await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
            },
        });

        console.log(user);

        if (!user) throw new Error('Failed to create new member.');

        await prisma.user.update({
            where: { email: email },
            data: { role, baseSalary },
        });

        return { success: true, data: user };
    } catch (error) {
        return { success: false, error: 'Staff creating error' };
    }
}
