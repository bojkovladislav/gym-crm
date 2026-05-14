import { getUserPaycheckStats } from '@/services/paycheck.service';

export async function getUserPaycheckStatsAction(userId: string) {
    try {
        const stats = await getUserPaycheckStats(userId);

        return { success: true, data: stats };
    } catch (error) {
        return { success: false, error: 'Failed to get user paycheck stats.' };
    }
}
