'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function getSessionOnServer() {
    return await auth.api.getSession({
        headers: await headers(),
    });
}
