'use server';

import { createSafeAction } from '@/helpers/createSafeAction';
import {
    deleteMember,
    editMember,
    getActiveTrainers,
    getTrainerMembers,
    memberCheckIn,
} from '@/services/member.service';

export const updateMember = async (
    memberId: string,
    updatedData: { name?: string; email?: string; dob?: Date; planId?: string },
) =>
    createSafeAction(
        () => editMember(memberId, updatedData),
        'Could not update member in the database.',
    );

export const removeMember = async (memberId: string) =>
    await createSafeAction(
        () => deleteMember(memberId),
        'Could not delete member from database.',
    );

export async function getTrainerMembersAction(trainerId: string) {
    try {
        const members = await getTrainerMembers(trainerId);

        return { success: true, data: members };
    } catch (error) {
        return { success: false, error: 'Failed to get trainer members.' };
    }
}

export const getActiveTrainersAction = async () =>
    await createSafeAction(
        getActiveTrainers,
        'Could not fetch all active trainers from database.',
    );

export const memberCheckInAction = async (memberId: string) =>
    createSafeAction(
        () => memberCheckIn(memberId),
        'Could not initiate member check in.',
    );
