'use server';

import { createSafeAction } from '@/helpers/createSafeAction';
import { getPlans } from '@/services/plans.service';

export const getPlansAction = async () =>
    await createSafeAction(
        getPlans,
        'Could not fetch plans from the database.',
    );
