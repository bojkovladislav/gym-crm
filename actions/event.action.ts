'use server';

import { AppointmentFormValues } from '@/features/MyClients/CreateAppointmentModal';
import {
    completeEvent,
    createAppointmentEvent,
    getEvents,
} from '@/services/event.service';

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

export async function createAppointmentEventAction(
    trainerId: string,
    memberId: string,
    data: AppointmentFormValues,
) {
    try {
        const newEvent = await createAppointmentEvent(
            trainerId,
            memberId,
            data,
        );

        return { success: true, data: newEvent };
    } catch (error) {
        return { success: false, error: 'Failed to create an appointment.' };
    }
}
