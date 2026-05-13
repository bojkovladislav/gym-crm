'use server';

import {
    getAllTransactions,
    getTransactionChartData,
    getTransactionStats,
} from '@/services/transaction.service';

export async function getBillingDataAction() {
    try {
        const stats = await getTransactionStats();
        const transactions = await getAllTransactions();

        return { success: true, data: { stats, transactions } };
    } catch (error) {
        return { success: false, error: 'Failed to fetch billing data.' };
    }
}

export async function getTransactionChartDataAction() {
    try {
        const data = await getTransactionChartData();

        return { success: true, data };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to get Transaction Chart Data.',
        };
    }
}
