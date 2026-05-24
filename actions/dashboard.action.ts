'use server';

import { createSafeAction } from '@/helpers/createSafeAction';
import {
    getAdminDashboardStats,
    getOwnerDashboardStats,
    getTrainerDashboardStats,
} from '@/services/dashboard.service';

export const getOwnerDashboardStatsAction = async () =>
    await createSafeAction(
        getOwnerDashboardStats,
        'Could not fetch owner dashboard stats from database.',
    );

export const getAdminDashboardStatsAction = async () =>
    await createSafeAction(
        getAdminDashboardStats,
        'Could not fetch admin dashboard stats from database.',
    );

export const getTrainerDashboardStatsAction = async (trainerId: string) =>
    await createSafeAction(
        () => getTrainerDashboardStats(trainerId),
        'Could not fetch trainer dashboard stats from database.',
    );
