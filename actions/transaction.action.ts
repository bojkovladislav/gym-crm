'use server';

import { createSafeAction } from '@/helpers/createSafeAction';
import {
    getAllTransactions,
    getTransactionChartData,
    getTransactionStats,
} from '@/services/transaction.service';

export const getBillingDataAction = async () =>
    await createSafeAction(async () => {
        const stats = await getTransactionStats();
        const transactions = await getAllTransactions();

        return { stats, transactions };
    }, 'Could not fetch billing data from the database.');

export const getTransactionChartDataAction = async () =>
    await createSafeAction(
        getTransactionChartData,
        'Could not fetch transaction data chart from the database.',
    );
