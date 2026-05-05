'use server';

import { deleteMember, editMember } from '@/services/member.service';

export async function updateMember(
    memberId: string,
    updatedData: { name?: string; email?: string; dob?: Date; planId?: string },
) {
    try {
        const member = await editMember(memberId, updatedData);

        return { success: true, data: member };
    } catch (error) {
        console.error('Server action failed to update member:', error);

        return {
            success: false,
            error: 'Could not update member in the database.',
        };
    }
}

export async function removeMember(memberId: string) {
    try {
        const deletedMember = await deleteMember(memberId);

        return { success: true, data: deletedMember };
    } catch (error) {
        return { success: false, error: "Couldn't delete member" };
    }
}
