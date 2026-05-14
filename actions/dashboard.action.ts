'use server';

import {
    getAdminDashboardStats,
    getOwnerDashboardStats,
    getTrainerDashboardStats,
} from '@/services/dashboard.service';

export async function getOwnerDashboardStatsAction() {
    try {
        const data = await getOwnerDashboardStats();

        return { success: true, data };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to fetch owner dashboard data.',
        };
    }
}

export async function getAdminDashboardStatsAction() {
    try {
        const data = await getAdminDashboardStats();

        return { success: true, data };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to fetch admin dashboard data.',
        };
    }
}

export async function getTrainerDashboardStatsAction(trainerId: string) {
    try {
        const data = await getTrainerDashboardStats(trainerId);

        return { success: true, data };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to fetch trainer dashboard data.',
        };
    }
}
