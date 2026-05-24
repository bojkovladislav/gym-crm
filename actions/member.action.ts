'use server';

import { Member } from '@/features/Members/Members';
import { createSafeAction } from '@/helpers/createSafeAction';
import {
    createMember,
    deleteMember,
    editMember,
    getActiveTrainers,
    getMembers,
    getTrainerMembers,
    memberCheckIn,
} from '@/services/member.service';

export const createMemberAction = async (newMember: Member) =>
    await createSafeAction(
        () => createMember(newMember),
        'Could not create a new member.',
    );

export const getMembersAction = async () =>
    await createSafeAction(
        getMembers,
        'Could not fetch members from the database.',
    );

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

export const getTrainerMembersAction = async (trainerId: string) =>
    await createSafeAction(
        () => getTrainerMembers(trainerId),
        'Could not fetch trainer members from database.',
    );

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
