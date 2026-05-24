import { createSafeAction } from '@/helpers/createSafeAction';
import { getUserPaycheckStats } from '@/services/paycheck.service';

export const getUserPaycheckStatsAction = async (userId: string) =>
    await createSafeAction(
        () => getUserPaycheckStats(userId),
        'Could not fetch user paycheck stats from database.',
    );
