'use server';

import { getEvents } from '@/services/event.service';

export async function getEventsAction() {
    try {
        const events = await getEvents();

        return { success: true, data: events };
    } catch (error) {
        return { success: false, error: 'Failed to fetch events.' };
    }
}
