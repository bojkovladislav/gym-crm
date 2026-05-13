'use server';

import {
    deleteMember,
    editMember,
    getActiveTrainers,
    getTrainerMembers,
    memberCheckIn,
} from '@/services/member.service';

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

export async function memberCheckInAction(keyFobId: string) {
    try {
        const data = await memberCheckIn(keyFobId);

        return { success: true, data };
    } catch (error) {
        return {
            success: false,
            error: "Couldn't initiate member access procedure",
        };
    }
}

export async function getTrainerMembersAction(trainerId: string) {
    try {
        const members = await getTrainerMembers(trainerId);

        return { success: true, data: members };
    } catch (error) {
        return { success: false, error: 'Failed to get trainer members.' };
    }
}

export async function getActiveTrainersAction() {
    try {
        const trainers = await getActiveTrainers();

        return { success: true, data: trainers };
    } catch (error) {
        return { success: false, error: 'Failed to get all active trainers.' };
    }
}
