'use server';

import { completeEvent, getEvents } from '@/services/event.service';

export async function getEventsAction() {
    try {
        const events = await getEvents();

        return { success: true, data: events };
    } catch (error) {
        return { success: false, error: 'Failed to fetch events.' };
    }
}

export async function completeEventAction(eventId: string) {
    try {
        const data = await completeEvent(eventId);

        return { success: true, data };
    } catch (error) {
        return { success: false, error: 'Failed to get complete event.' };
    }
}
