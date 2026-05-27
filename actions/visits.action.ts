'use server';

import { createSafeAction } from '@/helpers/createSafeAction';
import { getVisits } from '@/services/visits.service';

export const getVisitsAction = async (memberId: string) =>
    await createSafeAction(
        () => getVisits(memberId),
        'Could not fetch member visits from database.',
    );
